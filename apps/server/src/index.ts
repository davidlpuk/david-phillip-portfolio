/**
 * Chat API Server for David's AI Digital Twin
 * Uses Ollama for chat completions with RAG
 */

import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import {
  generateResponse,
  initialiseVectorStore,
  checkOllamaHealth,
} from "./rag-service";
import articlesRouter from "./routes/articles";
import scrapeRouter from "./routes/scrape";
import authRouter from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory conversation storage (for production, use Redis)
interface Conversation {
  messages: Array<{
    role: "user" | "assistant";
    content: string;
    timestamp: number;
  }>;
}

const conversations = new Map<string, Conversation>();

// Serve static files - ONLY if not running in Vercel (Vercel handles static files via 'outputDirectory')
if (!process.env.VERCEL) {
  try {
    const clientBuildPath = path.resolve(
      import.meta.dirname,
      "..",
      "..",
      "..",
      "dist",
      "public",
    );
    app.use(express.static(clientBuildPath));
  } catch (e) {
    console.warn("Could not setup static file serving:", e);
  }
}

// Health check endpoint
const healthHandler = async (req: any, res: any) => {
  try {
    const health = await checkOllamaHealth();
    res.json({
      status: "ok",
      ollama: health,
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL ? "vercel" : "local",
    });
  } catch (error: any) {
    console.error("Health check failed:", error);
    // Always return 200 for health check to prevent client errors
    res.json({
      status: "ok",
      ollama: { status: "error", provider: "none", details: error.message },
      timestamp: new Date().toISOString(),
    });
  }
};

app.get("/api/health", healthHandler);
app.get("/health", healthHandler);

app.use("/api/articles", articlesRouter);
app.use("/api", scrapeRouter);
app.use("/api/auth", authRouter);

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Save article endpoint
app.post("/api/save-article", (req, res) => {
  const { content, filename } = req.body;

  if (!content || !filename) {
    return res.status(400).json({ error: "Content and filename are required" });
  }

  // Ensure filename ends with .md
  const safeFilename = filename.endsWith(".md") ? filename : `${filename}.md`;

  // Path to articles folder
  const articlesPath = path.resolve(
    import.meta.dirname,
    "..",
    "..",
    "..",
    "apps",
    "client",
    "src",
    "features",
    "articles",
  );
  const filePath = path.join(articlesPath, safeFilename);

  try {
    // Ensure articles directory exists
    if (!fs.existsSync(articlesPath)) {
      fs.mkdirSync(articlesPath, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(filePath, content, "utf8");

    res.json({ success: true, message: `Article saved as ${safeFilename}` });
  } catch (error) {
    console.error("Error saving article:", error);
    res.status(500).json({ error: "Failed to save article" });
  }
});

// Update article status endpoint
app.patch("/api/articles/:slug/status", (req, res) => {
  const { slug } = req.params;
  const { status } = req.body;

  if (!status || !["draft", "published"].includes(status)) {
    return res.status(400).json({ error: "Valid status is required" });
  }

  const articlesPath = path.resolve(
    import.meta.dirname,
    "..",
    "..",
    "..",
    "apps",
    "client",
    "src",
    "features",
    "articles",
  );
  const filePath = path.join(articlesPath, `${slug}.md`);

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Read current content
    const content = fs.readFileSync(filePath, "utf8");

    // Update status in frontmatter
    const updatedContent = content.replace(
      /(status:\s*["']?)([^"'\n]*)(["']?)/,
      `$1${status}$3`,
    );

    // Write back
    fs.writeFileSync(filePath, updatedContent, "utf8");

    res.json({ success: true, message: `Article status updated to ${status}` });
  } catch (error) {
    console.error("Error updating article status:", error);
    res.status(500).json({ error: "Failed to update article status" });
  }
});

// Delete article endpoint
app.delete("/api/articles/:slug", (req, res) => {
  const { slug } = req.params;

  const articlesPath = path.resolve(
    import.meta.dirname,
    "..",
    "..",
    "..",
    "apps",
    "client",
    "src",
    "features",
    "articles",
  );
  const filePath = path.join(articlesPath, `${slug}.md`);

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Delete the file
    fs.unlinkSync(filePath);

    res.json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Failed to delete article" });
  }
});

import nodemailer from 'nodemailer';

// Helper to log submissions locally (Reliable backup)
function logContactSubmission(data: any) {
  const logPath = path.join(process.cwd(), 'contact_submissions.json');
  let submissions = [];
  try {
    if (fs.existsSync(logPath)) {
      const fileContent = fs.readFileSync(logPath, 'utf8');
      if (fileContent) submissions = JSON.parse(fileContent);
    }
  } catch (e) {
    console.error('Error reading log file', e);
  }

  submissions.push({ ...data, timestamp: new Date().toISOString() });

  try {
    fs.writeFileSync(logPath, JSON.stringify(submissions, null, 2));
    console.log('✅ Contact form submitted and saved to contact_submissions.json');
  } catch (e) {
    console.error('Error writing log file', e);
  }
}

// Helper to send email (If configured)
async function sendEmailNotification(data: any) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Skipping email send: EMAIL_USER/EMAIL_PASS not set in .env');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Default to gmail for simplicity, or use host/port if provided
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'david.phillip@gmail.com', // Target email (David's)
      subject: `Portfolio Inquiry from ${data.email || 'Visitor'}`,
      text: `New message from portfolio contact form:
      
Email: ${data.email}
Message: ${data.message}
      
Timestamp: ${new Date().toLocaleString()}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Email notification sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

// Chat endpoint
const chatHandler = async (req: any, res: any) => {
  const { message, conversationId, mode } = req.body;

  if (!message || (typeof message !== "string" && typeof message !== "object")) {
    return res.status(400).json({ error: "Message is required" });
  }

  const messageContent = typeof message === 'string' ? message : JSON.stringify(message);

  const convId = conversationId || `conv-${Date.now()}`;

  // Get or create conversation
  if (!conversations.has(convId)) {
    conversations.set(convId, { messages: [] });
  }
  const conversation = conversations.get(convId)!;

  try {
    // Add user message to conversation
    // Add user message to conversation
    conversation.messages.push({
      role: "user",
      content: messageContent,
      timestamp: Date.now(),
    });

    // Generate response using RAG
    const llmResponse = await generateResponse(
      messageContent,
      conversation.messages.slice(-10), // Last 10 messages for context
    );

    // Add assistant response to conversation
    conversation.messages.push({
      role: "assistant",
      content: llmResponse,
      timestamp: Date.now(),
    });

    // A2UI Construct
    let responsePayload: any;

    if (mode === 'a2ui') {
      const lowerMessage = typeof message === 'string' ? message.toLowerCase() : '';

      // Feature: Form Submission
      if (typeof message === 'object') {
        // Save to file
        logContactSubmission(message);

        // Try to send email (async, don't block response)
        sendEmailNotification(message).catch(err => console.error("Email send failed in background", err));

        responsePayload = {
          type: 'box',
          props: { className: "bg-green-500/10 border-green-500/20 p-4 rounded-lg" },
          children: [
            { type: 'text', props: { content: "✅ **Message Received**\n\nThanks for reaching out! I've saved your message and sent a notification to David. He'll get back to you shortly." } }
          ]
        };
      }
      // Feature: Recruiter / HR "Cheat Sheet"
      else if (lowerMessage.includes('recruiter') || lowerMessage.includes('hiring') || lowerMessage.includes('hr') || lowerMessage.includes('talent') || lowerMessage.includes('headhunter')) {
        responsePayload = {
          type: 'stack',
          props: { direction: 'column', className: 'gap-4' },
          children: [
            {
              type: 'text',
              props: { content: "👋 Hello! I know you're busy, so here is my **Recruiter Cheat Sheet** with everything you typically need to know:" }
            },
            {
              type: 'card',
              props: { className: "bg-card border-l-4 border-l-primary shadow-md overflow-hidden" }, // Border left highlight
              children: [
                {
                  type: 'box',
                  props: { className: "grid grid-cols-2 gap-x-4 gap-y-4 p-4" },
                  children: [
                    // Left Col
                    { type: 'text', props: { content: "**Role:**\nProduct Design Lead" } },
                    { type: 'text', props: { content: "**Experience:**\n10+ Years" } },
                    { type: 'text', props: { content: "**Notice Period:**\nComing to end of contract" } },
                    { type: 'text', props: { content: "**Location:**\nLondon / Remote" } },
                    { type: 'text', props: { content: "**Visa Status:**\nUK Citizen" } },
                    { type: 'text', props: { content: "**Salary:**\nOpen to discussion" } },
                  ]
                }
              ]
            },
            {
              type: 'stack',
              props: { direction: 'row', className: 'gap-3' },
              children: [
                {
                  type: 'link',
                  props: {
                    label: 'Download CV (PDF)',
                    url: '/docs/DP CV - Download.md', // Linking to the MD file for now as placeholder, or real PDF if exists
                    external: true,
                    className: 'flex-1 inline-flex justify-center items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors'
                  }
                },
                {
                  type: 'button',
                  props: {
                    label: 'Book 15min Screen',
                    action: 'sendMessage',
                    payload: 'I would like to book a screening call.',
                    className: 'flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm font-medium'
                  }
                }
              ]
            }
          ]
        };
      }
      // Feature: Tech Stack / Tools
      else if (lowerMessage.includes('stack') || lowerMessage.includes('tools') || lowerMessage.includes('technologies')) {
        responsePayload = {
          type: 'stack',
          props: { direction: 'column', className: 'gap-4' },
          children: [
            {
              type: 'text',
              props: { content: "I rely on a modern, frontier-tech stack to build scalable products:" }
            },
            {
              type: 'box',
              props: { className: "grid grid-cols-2 gap-3" },
              children: [
                { type: 'box', props: { className: "bg-muted/50 p-3 rounded text-center text-sm font-semibold" }, children: [{ type: 'text', props: { content: "🎨 Figma" } }] },
                { type: 'box', props: { className: "bg-muted/50 p-3 rounded text-center text-sm font-semibold" }, children: [{ type: 'text', props: { content: "⚛️ React / Next.js" } }] },
                { type: 'box', props: { className: "bg-muted/50 p-3 rounded text-center text-sm font-semibold" }, children: [{ type: 'text', props: { content: "🧠 AI Agents (A2UI)" } }] },
                { type: 'box', props: { className: "bg-muted/50 p-3 rounded text-center text-sm font-semibold" }, children: [{ type: 'text', props: { content: "📊 Mixpanel" } }] }
              ]
            }
          ]
        };
      }
      // Feature: Resume / CV
      else if (lowerMessage.includes('resume') || lowerMessage.includes('cv') || lowerMessage.includes('experience')) {
        responsePayload = {
          type: 'card',
          props: {
            title: 'Experience & Credentials',
            description: 'With over 10 years of experience leading design at major financial institutions like HSBC and Coutts, I bring a wealth of strategic and hands-on expertise.',
            image: '/images/hero-image.png' // Utilizing an existing image
          },
          children: [
            {
              type: 'stock',
              props: { direction: 'row', className: 'gap-3 mt-4' },
              children: [
                {
                  type: 'link',
                  props: { label: 'View Full Bio', url: '/about', className: 'px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium no-underline hover:bg-primary/90' }
                },
                {
                  type: 'link',
                  props: { label: 'LinkedIn', url: 'https://linkedin.com/in/davidphillip', external: true, className: 'px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium no-underline hover:bg-secondary/80' }
                }
              ]
            }
          ]
        };
      }
      // Feature: Portfolio Carousel Trigger
      else if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('project') || lowerMessage.includes('case study')) {
        responsePayload = {
          type: 'stack',
          props: { direction: 'column', className: 'gap-4' },
          children: [
            {
              type: 'text',
              props: { content: "Here are a few highlights from my portfolio:" }
            },
            {
              type: 'carousel',
              props: { className: 'w-full' },
              children: [
                {
                  type: 'card',
                  props: {
                    title: 'Coutts & Co.',
                    description: 'Leading the digital transformation for the UK\'s oldest private bank.',
                    image: '/images/case-study-hero-coutts.png'
                  },
                  children: [
                    {
                      type: 'link',
                      props: { label: 'View Case Study', url: '/case-study/coutts', className: 'text-xs text-blue-600 dark:text-blue-400 mt-2 block font-semibold hover:underline' }
                    }
                  ]
                },
                {
                  type: 'card',
                  props: {
                    title: 'Cognism',
                    description: 'Redesigning the core platform to improve user experience and retention.',
                    image: '/images/case-study-hero-cognism.png'
                  },
                  children: [
                    {
                      type: 'link',
                      props: { label: 'View Case Study', url: '/case-study/cognism', className: 'text-xs text-blue-600 dark:text-blue-400 mt-2 block font-semibold hover:underline' }
                    }
                  ]
                },
                {
                  type: 'card',
                  props: {
                    title: 'HSBC Kinetic',
                    description: 'Building a new mobile banking proposition for small businesses.',
                    image: '/images/case-study-hero-hsbc.png'
                  },
                  children: [
                    {
                      type: 'link',
                      props: { label: 'View Case Study', url: '/case-study/hsbc', className: 'text-xs text-blue-600 dark:text-blue-400 mt-2 block font-semibold hover:underline' }
                    }
                  ]
                }
              ]
            }
          ]
        };
      }
      // Feature: Availability / Calendar
      else if (lowerMessage.includes('calendar') || lowerMessage.includes('availability') || lowerMessage.includes('schedule') || lowerMessage.includes('book')) {
        const today = new Date();
        const dates = [0, 1, 2].map(d => {
          const date = new Date(today);
          date.setDate(today.getDate() + d + 1); // Next 3 days
          return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        });

        responsePayload = {
          type: 'stack',
          props: { direction: 'column', className: 'gap-4' },
          children: [
            {
              type: 'text',
              props: { content: "Here's my availability for the next few days. Select a slot to request a booking:" }
            },
            {
              type: 'card',
              props: { title: "Upcoming Slots", className: "mt-5" },
              children: [
                {
                  type: 'stack',
                  props: { direction: 'column', className: 'gap-2 pt-2' },
                  children: [
                    {
                      type: 'button',
                      props: { label: `${dates[0]} - 10:00 AM`, action: 'sendMessage', payload: `Request booking for ${dates[0]} at 10:00 AM`, className: "w-full justify-start text-left bg-muted/30 hover:bg-primary/10 text-foreground border border-border/50" }
                    },
                    {
                      type: 'button',
                      props: { label: `${dates[0]} - 2:00 PM`, action: 'sendMessage', payload: `Request booking for ${dates[0]} at 2:00 PM`, className: "w-full justify-start text-left bg-muted/30 hover:bg-primary/10 text-foreground border border-border/50" }
                    },
                    {
                      type: 'button',
                      props: { label: `${dates[1]} - 11:30 AM`, action: 'sendMessage', payload: `Request booking for ${dates[1]} at 11:30 AM`, className: "w-full justify-start text-left bg-muted/30 hover:bg-primary/10 text-foreground border border-border/50" }
                    },
                    {
                      type: 'link',
                      props: { label: 'View Full Calendar', url: 'https://calendly.com/david-phillip/30min', external: true, className: 'text-xs text-center text-muted-foreground mt-2 block w-full hover:text-foreground hover:underline' }
                    }
                  ]
                }
              ]
            }
          ]
        };
      }
      // Feature: Contact Form Trigger
      else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('hire')) {
        responsePayload = {
          type: 'form',
          props: {
            title: "Send me a message",
            action: "sendMessage",
            submitLabel: "Send Inquiry"
          },
          children: [
            {
              type: 'input',
              props: { name: 'email', label: 'Your Email', placeholder: 'david@example.com', inputType: 'email' }
            },
            {
              type: 'input',
              props: { name: 'inquiry', label: 'Message', placeholder: 'Project details...', inputType: 'text' }
            }
          ]
        };
      }
      // Feature: Form Submission Handling (Mock)
      else if (typeof message === 'object' && (message as any).email) {
        const email = (message as any).email;
        responsePayload = {
          type: 'box',
          props: { className: "bg-green-500/10 border-green-500/50" },
          children: [
            {
              type: 'text',
              props: { content: `Thanks! I've received your inquiry from ${email}. I'll get back to you shortly.` }
            }
          ]
        };
      }
      else {
        const textComponent = {
          type: 'text',
          props: { content: llmResponse }
        };

        // Add suggestions if conversation is short
        if (conversation.messages.length <= 4) { // Only first couple of exchanges
          const suggestions = [
            { icon: "👔", text: "Leadership experience" },
            { icon: "📈", text: "Biggest business impact" },
            { icon: "🎯", text: "Open to opportunities?" },
            { icon: "✉️", text: "Contact me" },
          ];

          const suggestionButtons = suggestions.map(s => ({
            type: 'button',
            props: {
              label: `${s.icon} ${s.text}`,
              action: 'sendMessage',
              payload: s.text.includes('Contact') ? 'Contact me' : `What's ${s.text}?`,
              className: "px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted border border-border/50 text-xs text-muted-foreground transition-all duration-200"
            }
          }));

          responsePayload = {
            type: 'stack',
            props: { direction: 'column', className: 'gap-3' },
            children: [
              textComponent,
              {
                type: 'stack',
                props: { direction: 'row', className: 'flex-wrap gap-2 mt-2' },
                children: suggestionButtons
              }
            ]
          };
        } else {
          // Just text for deeper conversation
          responsePayload = textComponent;
        }
      }

    } else {
      // Legacy string response
      responsePayload = llmResponse;
    }

    res.json({
      response: responsePayload,
      conversationId: convId,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      error: "Failed to generate response",
      message:
        "I apologize, but I'm experiencing some technical difficulties. Please try again later.",
    });
  }
};

app.post("/api/chat", chatHandler);
app.post("/chat", chatHandler);

// Clear conversation
app.delete("/api/chat/:conversationId", (req, res) => {
  const { conversationId } = req.params;
  conversations.delete(conversationId);
  res.json({ success: true });
});

// Serve the React app for all non-API routes (SPA fallback)
app.get("*", (req, res) => {
  // Don't handle API routes
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res
    .status(404)
    .send("Static files not found. Ensure build process completed.");
});

// Initialise vector store on startup
async function startServer() {
  try {
    console.log("Initialising vector store in background...");

    // Start vector store in background - don't wait for it
    initialiseVectorStore()
      .then(() => console.log("Vector store ready"))
      .catch((err) => console.warn("Vector store failed:", err.message));

    // Start server immediately
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
      console.log("Ready to handle requests!");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Export app for Vercel/Serverless
export default app;

// Only start the server if not running in Vercel (Vercel handles the server start via the export)
if (!process.env.VERCEL) {
  startServer();
}
