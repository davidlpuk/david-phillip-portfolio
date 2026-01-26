/**
 * RAG (Retrieval-Augmented Generation) Service
 * Uses Groq or xAI for fast LLM inference, Ollama for embeddings
 */

import { knowledgeBase, KnowledgeChunk, systemPrompt } from './knowledge-base';

// Groq configuration (fast cloud inference)
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';

// xAI (Grok) configuration
const XAI_API_KEY = process.env.XAI_API_KEY || '';
const XAI_MODEL = process.env.XAI_MODEL || 'grok-beta';
const XAI_BASE_URL = 'https://api.x.ai/v1';

// Ollama configuration (for embeddings)
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'nomic-embed-text';
const LLM_MODEL = process.env.LLM_MODEL || 'llama3.2';

// In-memory vector store
interface VectorStore {
    chunks: Map<string, KnowledgeChunk>;
    embeddings: Map<string, number[]>;
}

const vectorStore: VectorStore = {
    chunks: new Map(),
    embeddings: new Map(),
};

// Get embedding from Ollama
async function getEmbedding(text: string): Promise<number[]> {
    try {
        const response = await fetch(`${OLLAMA_BASE_URL}/api/embeddings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: EMBEDDING_MODEL,
                prompt: text,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Ollama embeddings API error: ${response.status} ${errorText}`);
            // Return mock embedding for fallback
            return new Array(768).fill(0);
        }

        const data = await response.json();
        return data.embedding;
    } catch (error) {
        console.error('Error getting embedding from Ollama:', error);
        // Return mock embedding for fallback
        return new Array(768).fill(0);
    }
}

// Cosine similarity calculation
function cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Initialise the vector store with knowledge base
export async function initialiseVectorStore(): Promise<void> {
    console.log('Initialising vector store with knowledge base...');
    console.log(`Using Groq: ${!!GROQ_API_KEY}, Model: ${GROQ_MODEL}`);
    console.log(`Using xAI (Grok): ${!!XAI_API_KEY}, Model: ${XAI_MODEL}`);

    // Check if we are on Vercel - if so, skip embedding fetching to avoid timeouts
    // since localhost is not available
    if (process.env.VERCEL) {
        console.warn('Running on Vercel: Skipping Ollama embeddings fetch, strictly using fallback/keywords.');
        for (const chunk of knowledgeBase) {
            vectorStore.chunks.set(chunk.id, chunk);
            vectorStore.embeddings.set(chunk.id, new Array(768).fill(0));
        }
        console.log(`Vector store initialised with ${knowledgeBase.length} chunks (Vercel mode)`);
        return;
    }

    // Pre-load chunks - we'll try to get embeddings
    for (const chunk of knowledgeBase) {
        try {
            const embedding = await getEmbedding(chunk.content);
            vectorStore.chunks.set(chunk.id, chunk);
            vectorStore.embeddings.set(chunk.id, embedding);
        } catch (error) {
            console.warn(`Failed to get embedding for chunk ${chunk.id}, using mock`);
            vectorStore.chunks.set(chunk.id, chunk);
            vectorStore.embeddings.set(chunk.id, new Array(768).fill(0));
        }
    }

    console.log(`Vector store initialised with ${knowledgeBase.length} chunks`);
}

// Simple keyword matching as fallback
function keywordMatch(query: string, chunk: KnowledgeChunk): number {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/);
    let score = 0;

    chunk.keywords.forEach(keyword => {
        if (queryLower.includes(keyword)) score += 10;
    });

    queryWords.forEach(word => {
        if (word.length > 3 && chunk.content.toLowerCase().includes(word)) {
            score += 1;
        }
    });

    return score;
}

// Find most relevant chunks for a query
export async function findRelevantChunks(
    query: string,
    topK: number = 5
): Promise<KnowledgeChunk[]> {
    // Check if we have real embeddings
    const hasRealEmbeddings = Array.from(vectorStore.embeddings.values()).some(e =>
        e.some(val => val !== 0)
    );

    if (!hasRealEmbeddings) {
        // Use keyword matching fallback
        const scored = knowledgeBase.map(chunk => ({
            chunk,
            score: keywordMatch(query, chunk),
        }));

        return scored
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, topK)
            .map(item => item.chunk);
    }

    // Get query embedding
    const queryEmbedding = await getEmbedding(query);

    // Calculate similarities
    const similarities: { chunk: KnowledgeChunk; score: number }[] = [];

    for (const [id, chunkEmbedding] of Array.from(vectorStore.embeddings.entries())) {
        const score = cosineSimilarity(queryEmbedding, chunkEmbedding);
        const chunk = vectorStore.chunks.get(id);
        if (chunk) {
            similarities.push({ chunk, score });
        }
    }

    // Sort by similarity and return top K
    return similarities
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)
        .map((item) => item.chunk);
}

// Generate response using Groq or xAI with RAG context
export async function generateResponse(
    userMessage: string,
    conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> {
    try {
        // Get relevant context
        const relevantChunks = await findRelevantChunks(userMessage, 5);
        const context = relevantChunks.map((chunk) => chunk.content).join('\n\n');

        // Build the full prompt with context
        const fullPrompt = `${systemPrompt}

## Relevant Context from Knowledge Base
---
${context}
---

## Conversation History
${conversationHistory.map((msg) => `${msg.role}: ${msg.content}`).join('\n')}

## Current User Message
user: ${userMessage}

## Response
assistant:`;

        // Case 1: xAI (Grok) is configured
        if (XAI_API_KEY) {
            try {
                const response = await fetch(`${XAI_BASE_URL}/chat/completions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${XAI_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: XAI_MODEL,
                        messages: [
                            { role: 'system', content: "You are David's Digital Assistant." },
                            { role: 'user', content: fullPrompt }
                        ],
                        temperature: 0.7,
                        stream: false,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    return data.choices[0].message.content;
                }
                console.warn(`xAI API returned ${response.status}:`, await response.text());
            } catch (e) {
                console.error('xAI API call failed:', e);
            }
        }

        // Case 2: Groq is configured (Fallback or Primary)
        if (GROQ_API_KEY) {
            try {
                const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${GROQ_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: GROQ_MODEL,
                        messages: [
                            { role: 'system', content: "You are David's Digital Assistant." },
                            { role: 'user', content: fullPrompt }
                        ],
                        temperature: 0.7,
                        stream: false,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    return data.choices[0].message.content;
                }
                console.warn(`Groq API returned ${response.status}:`, await response.text());
            } catch (e) {
                console.error('Groq API call failed:', e);
            }
        }

        // Case 3: Vercel Environment with NO API Keys -> Return Safe Fallback
        if (process.env.VERCEL) {
            console.warn('No LLM keys configured on Vercel. returning keyword match fallback.');
            const fallbackResponse = `I see you're asking about: "${userMessage}".\n\nBased on my knowledge base, here is the relevant information:\n\n${context}\n\n(Note: I am currently running in offline mode, so my ability to converse naturally is limited. Please double-check my configuration.)`;
            return fallbackResponse;
        }

        // Case 4: Local Development -> Fallback to Ollama
        console.warn('No Cloud API keys configured, falling back to local Ollama');
        return await generateResponseOllama(fullPrompt);

    } catch (error) {
        console.error('Error generating response:', error);
        return `I apologise, but I'm experiencing some technical difficulties. Please try again, or feel free to book a 30-minute call with David directly via david.phillip@gmail.com.`;
    }
}

// Fallback: Generate response using Ollama (original implementation)
async function generateResponseOllama(fullPrompt: string): Promise<string> {
    try {
        const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: LLM_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt,
                    },
                    {
                        role: 'user',
                        content: fullPrompt,
                    },
                ],
                stream: false,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Ollama API error: ${response.status} ${errorText}`);
            throw new Error(`Ollama API error: ${response.status}`);
        }

        const data = await response.json();
        // Add a brief delay to make responses feel more natural
        await new Promise(resolve => setTimeout(resolve, 1500));
        return data.message.content;
    } catch (error) {
        console.error('Error generating response from Ollama:', error);
        throw error;
    }
}

// Health check
export async function checkOllamaHealth(): Promise<{ status: string; configured: boolean; provider: string; details?: string }> {
    // Check xAI (Preferred if configured)
    if (XAI_API_KEY) {
        try {
            // Simple model list check
            const response = await fetch(`${XAI_BASE_URL}/models`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${XAI_API_KEY}` }
            });
            if (response.ok) {
                return { status: 'healthy', configured: true, provider: 'xai' };
            }
            console.warn(`xAI health check failed: ${response.status}`);
        } catch (e) {
            console.warn('xAI health check failed with error:', e);
        }
    }

    // Check Groq
    if (GROQ_API_KEY) {
        try {
            const response = await fetch(`${GROQ_BASE_URL}/models`, {
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                },
            });

            if (response.ok) {
                return { status: 'healthy', configured: true, provider: 'groq' };
            }
            console.warn(`Groq health check failed: ${response.status}`);
        } catch (e) {
            console.warn('Groq health check failed with error:', e);
        }
    }

    // Fall back to Ollama check
    // If we are on Vercel, we can't reach localhost, so fail fast instead of timing out
    if (process.env.VERCEL) {
        // If we have API keys but they failed above, report that.
        if (XAI_API_KEY || GROQ_API_KEY) {
            return { status: 'degraded', configured: true, provider: 'fallback', details: 'Cloud APIs failed, using keyword fallback' };
        }
        return { status: 'error', configured: false, provider: 'none', details: 'No AI provider configured on Vercel' };
    }

    try {
        const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);

        if (response.ok) {
            return { status: 'healthy', configured: true, provider: 'ollama' };
        }
        return { status: 'error', configured: true, provider: 'none' };
    } catch {
        return { status: 'error', configured: true, provider: 'none' };
    }
}

export { vectorStore };
