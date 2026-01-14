import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateResponse, initialiseVectorStore, checkOllamaHealth } from './src/rag-service';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory conversation storage
const conversations = new Map<string, any>();

// Resolve static files path
// In development (running server/index.ts): __dirname is /server, so ../dist/public
// In production (running dist/index.js): __dirname is /dist, so ./public
const staticPath = process.env.NODE_ENV === 'production'
  ? path.resolve(__dirname, 'public')
  : path.resolve(__dirname, '..', 'dist', 'public');

console.log(`Setting up static files from: ${staticPath}`);
app.use(express.static(staticPath));

// API Routes
// Health check handler
const healthHandler = async (req: any, res: any) => {
  const health = await checkOllamaHealth();
  res.json({
    status: 'ok',
    ollama: health,
    timestamp: new Date().toISOString(),
  });
};

app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// Chat endpoint
// Chat handler
const chatHandler = async (req: any, res: any) => {
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
app.delete('/api/chat/:conversationId', (req: any, res: any) => {
  const { conversationId } = req.params;
  conversations.delete(conversationId);
  res.json({ success: true });
});

// Serve the React app for all non-API routes (SPA fallback)
app.get('*', (req: any, res: any) => {
  // Don't handle API routes in the catch-all
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }

  // In production, if we are a serverless function, Vercel might handle static files.
  // However, if the server is used as a fallback, we serve index.html.
  try {
    res.sendFile(path.join(staticPath, 'index.html'));
  } catch (e) {
    res.status(404).send('Static files not found. Ensure build process completed.');
  }
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
