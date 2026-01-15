import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateResponse, initialiseVectorStore, checkOllamaHealth } from './src/rag-service';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory conversation storage
const conversations = new Map<string, any>();

// Serve static files - ONLY if not running in Vercel
if (!process.env.VERCEL) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const staticPath = process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, 'public')
      : path.resolve(__dirname, '..', 'dist', 'public');

    console.log(`Setting up static files from: ${staticPath}`);
    app.use(express.static(staticPath));
  } catch (e) {
    console.warn('Could not setup static file serving:', e);
  }
}

// API Routes
// Simple ping endpoint for debugging configuration
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong', timestamp: Date.now() });
});

// Health check handler
const healthHandler = async (req, res) => {
  try {
    const health = await checkOllamaHealth();
    res.json({
      status: 'ok',
      ollama: health,
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL ? 'vercel' : 'local'
    });
  } catch (error: any) {
    console.error('Health check CRITICAL failure:', error);
    // Always return 200 for health check to prevent client errors, but report status
    // correct status code to 200 so the client sees the error message in the body
    res.status(200).json({
      status: 'error',
      ollama: { status: 'error', provider: 'none', details: error.message || String(error) },
      timestamp: new Date().toISOString()
    });
  }
};

app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// Chat endpoint
// Chat handler
const chatHandler = async (req, res) => {
  const { message, conversationId } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const convId = conversationId || `conv-${Date.now()}`;

  if (!conversations.has(convId)) {
    conversations.set(convId, { messages: [] });
  }
  const conversation = conversations.get(convId)!;

  try {
    conversation.messages.push({
      role: 'user',
      content: message,
      timestamp: Date.now(),
    });

    const response = await generateResponse(
      message,
      conversation.messages.slice(-10)
    );

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
  // Don't handle API routes in the catch-all
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }

  // In production, if we are a serverless function, Vercel might handle static files.
  // However, if the server is used as a fallback, we serve index.html.
  res.status(404).send('Static files not found. Ensure build process completed.');
});

/**
 * Start the server for local development or traditional hosting.
 * On Vercel, this won't be called, and the app export will be used instead.
 */
async function boot() {
  try {
    console.log('Initialising vector store...');
    await initialiseVectorStore();
  } catch (error) {
    console.warn('Vector store initialisation failed, using fallback.');
  }

  // Only listen if we're not being required as a module (e.g. by Vercel)
  // and if we are not in a production environment that handles its own listening.
  if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

// Initialise but don't block
boot().catch(console.error);

export default app;
