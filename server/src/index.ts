 /**
 * Chat API Server for David's AI Digital Twin
 * Uses Ollama for chat completions with RAG
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { generateResponse, initialiseVectorStore, checkOllamaHealth } from './rag-service';
import articlesRouter from './routes/articles';

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

app.use('/api/articles', articlesRouter);

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running', timestamp: new Date().toISOString() });
});

// Save article endpoint
app.post('/api/save-article', (req, res) => {
    console.log('Save article request received:', req.body);
    const { content, filename } = req.body;

    if (!content || !filename) {
        console.log('Missing content or filename');
        return res.status(400).json({ error: 'Content and filename are required' });
    }

    // Ensure filename ends with .md
    const safeFilename = filename.endsWith('.md') ? filename : `${filename}.md`;

    // Path to articles folder
    const articlesPath = path.resolve(import.meta.dirname, '..', '..', 'client', 'src', 'articles');
    const filePath = path.join(articlesPath, safeFilename);

    console.log('Saving to:', filePath);

    try {
        // Ensure articles directory exists
        if (!fs.existsSync(articlesPath)) {
            fs.mkdirSync(articlesPath, { recursive: true });
            console.log('Created articles directory');
        }

        // Write the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('File written successfully');

        res.json({ success: true, message: `Article saved as ${safeFilename}` });
    } catch (error) {
        console.error('Error saving article:', error);
        res.status(500).json({ error: 'Failed to save article' });
    }
});

// Update article status endpoint
app.patch('/api/articles/:slug/status', (req, res) => {
    const { slug } = req.params;
    const { status } = req.body;

    if (!status || !['draft', 'published'].includes(status)) {
        return res.status(400).json({ error: 'Valid status is required' });
    }

    const articlesPath = path.resolve(import.meta.dirname, '..', '..', 'client', 'src', 'articles');
    const filePath = path.join(articlesPath, `${slug}.md`);

    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Article not found' });
        }

        // Read current content
        const content = fs.readFileSync(filePath, 'utf8');

        // Update status in frontmatter
        const updatedContent = content.replace(
            /(status:\s*["']?)([^"'\n]*)(["']?)/,
            `$1${status}$3`
        );

        // Write back
        fs.writeFileSync(filePath, updatedContent, 'utf8');

        res.json({ success: true, message: `Article status updated to ${status}` });
    } catch (error) {
        console.error('Error updating article status:', error);
        res.status(500).json({ error: 'Failed to update article status' });
    }
});

// Delete article endpoint
app.delete('/api/articles/:slug', (req, res) => {
    const { slug } = req.params;

    const articlesPath = path.resolve(import.meta.dirname, '..', '..', 'client', 'src', 'articles');
    const filePath = path.join(articlesPath, `${slug}.md`);

    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Article not found' });
        }

        // Delete the file
        fs.unlinkSync(filePath);

        res.json({ success: true, message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ error: 'Failed to delete article' });
    }
});

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
        // Temporarily skip vector store initialization for debugging
        // console.log('Initialising vector store...');
        // await initialiseVectorStore();

        app.listen(PORT, () => {
            console.log(`Chat API server running on http://localhost:${PORT}`);
            console.log('Ready to handle requests!');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
