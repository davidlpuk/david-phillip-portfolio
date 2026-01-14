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

// Serve static files - ONLY if not running in Vercel (Vercel handles static files via 'outputDirectory')
if (!process.env.VERCEL) {
    try {
        const clientBuildPath = path.resolve(import.meta.dirname, '..', '..', 'dist', 'public');
        app.use(express.static(clientBuildPath));
    } catch (e) {
        console.warn('Could not setup static file serving:', e);
    }
}

// Health check endpoint
const healthHandler = async (req: any, res: any) => {
    try {
        const health = await checkOllamaHealth();
        res.json({
            status: 'ok',
            ollama: health,
            timestamp: new Date().toISOString(),
            environment: process.env.VERCEL ? 'vercel' : 'local'
        });
    } catch (error: any) {
        console.error('Health check failed:', error);
        // Always return 200 for health check to prevent client errors
        res.json({
            status: 'ok',
            ollama: { status: 'error', provider: 'none', details: error.message },
            timestamp: new Date().toISOString()
        });
    }
};

app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// Chat endpoint
const chatHandler = async (req: any, res: any) => {
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
};

app.post('/api/chat', chatHandler);
app.post('/chat', chatHandler);

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
    res.status(404).send('Static files not found. Ensure build process completed.');
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
