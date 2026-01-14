/**
 * Chat API Server for David's AI Digital Twin
 * Uses Ollama for chat completions with RAG
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { generateResponse, initialiseVectorStore, checkOllamaHealth } from './rag-service';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory conversation storage (for production, use Redis)
interface Conversation {
    messages: Array<{ role: 'user' | 'assistant'; content: string; timestamp: number }>;
}

const conversations = new Map<string, Conversation>();

// Serve static files from the client's build output
const clientBuildPath = path.resolve(import.meta.dirname, '..', '..', 'dist', 'public');
app.use(express.static(clientBuildPath));

// Health check endpoint
app.get('/api/health', async (req, res) => {
    const health = await checkOllamaHealth();
    res.json({
        status: 'ok',
        ollama: health,
        timestamp: new Date().toISOString(),
    });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    const { message, conversationId } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
    }

    const convId = conversationId || `conv-${Date.now()}`;

    // Get or create conversation
    if (!conversations.has(convId)) {
        conversations.set(convId, { messages: [] });
    }
    const conversation = conversations.get(convId)!;

    try {
        // Add user message to conversation
        conversation.messages.push({
            role: 'user',
            content: message,
            timestamp: Date.now(),
        });

        // Generate response using RAG
        const response = await generateResponse(
            message,
            conversation.messages.slice(-10) // Last 10 messages for context
        );

        // Add assistant response to conversation
        conversation.messages.push({
            role: 'assistant',
            content: response,
            timestamp: Date.now(),
        });

        res.json({
            response,
            conversationId: convId,
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({
            error: 'Failed to generate response',
            message: 'I apologize, but I\'m experiencing some technical difficulties. Please try again later.',
        });
    }
});

// Clear conversation
app.delete('/api/chat/:conversationId', (req, res) => {
    const { conversationId } = req.params;
    conversations.delete(conversationId);
    res.json({ success: true });
});

// Serve the React app for all non-API routes (SPA fallback)
app.get('*', (req, res) => {
    // Don't handle API routes
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Initialise vector store on startup
async function startServer() {
    try {
        console.log('Initialising vector store...');
        await initialiseVectorStore();

        app.listen(PORT, () => {
            console.log(`Chat API server running on http://localhost:${PORT}`);
            console.log('Ready to chat with David\'s Digital Twin!');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
