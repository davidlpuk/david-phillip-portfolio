# David Phillip Portfolio

## Project Overview
This is a personal portfolio website for David Phillip, a UX Design Lead and Senior Product Designer. The project showcases his work experience, case studies, and includes an AI-powered digital twin chatbot that can answer questions about David's background and expertise.

## Tech Stack

### Frontend
- **Framework**: React 19.2.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.14 with custom design tokens
- **UI Components**: Radix UI primitives (Dialog, Dropdown, Tooltip, etc.)
- **Routing**: Wouter 3.3.5 (lightweight routing with custom patch)
- **Animation**: Framer Motion 12.23.22
- **Theme System**: Custom ThemeProvider with light/dark modes and multiple presets
- **Markdown**: react-markdown for content rendering

### Backend
- **Runtime**: Node.js with Express 4.21.2
- **API Server**: Express serving both API endpoints and static files
- **AI/ML**:
  - Groq API (llama-3.3-70b-versatile) for fast LLM inference
  - Ollama (local) for embeddings (nomic-embed-text model)
  - RAG (Retrieval-Augmented Generation) implementation
- **CORS**: Enabled for cross-origin requests

### Development
- **Package Manager**: pnpm 10.4.1
- **TypeScript**: 5.6.3
- **Linting/Formatting**: Prettier 3.6.2
- **Testing**: Vitest 2.1.4

## Project Structure

```
/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/        # Reusable UI components (Radix-based)
│   │   │   ├── chat/      # AI chatbot components
│   │   │   ├── About.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── SelectedWork.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── ...
│   │   ├── pages/         # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── CaseStudy.tsx
│   │   │   ├── CV.tsx
│   │   │   ├── DesignSystem.tsx
│   │   │   └── NotFound.tsx
│   │   ├── contexts/      # React contexts (ThemeContext)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── styles/        # Design tokens and global styles
│   │   ├── config/        # Configuration files
│   │   └── App.tsx        # Main app component
│   ├── public/            # Static assets
│   │   ├── images/        # Images and graphics
│   │   └── docs/          # Case study documents
│   └── index.html
├── server/                # Backend Express server
│   └── src/
│       ├── index.ts       # Server entry point
│       ├── rag-service.ts # RAG implementation
│       └── knowledge-base.ts # AI knowledge base
├── shared/                # Shared types/constants
├── dist/                  # Build output
└── patches/               # Package patches (wouter)
```

## Key Features

### 1. Portfolio Showcase
- Hero section with professional introduction
- Experience timeline
- Selected work gallery with case studies
- Testimonials from colleagues
- Responsive design with mobile-first approach

### 2. Case Studies
- Dynamic routing: `/case-study/:slug`
- Password-protected case studies (client confidentiality)
- Rich content with images, diagrams, and metrics
- Projects include: Coutts, HSBC, Schroders, Cognism

### 3. AI Digital Twin Chatbot
- RAG-powered conversational AI
- Knowledge base about David's experience and expertise
- Streaming responses with markdown formatting
- Conversation history management
- Groq API for fast inference + Ollama embeddings

### 4. Theme System
- Multiple theme presets (Theme X - electric lime/lavender accents)
- Light/dark mode support
- Custom design tokens in CSS variables
- Smooth theme transitions

### 5. Design System
- Component library showcase at `/design-system`
- Radix UI primitives with custom styling
- Consistent spacing, typography, and color tokens
- Accessible components following WCAG guidelines

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server health status and Ollama connection status.

### Chat
```
POST /api/chat
Body: { message: string, conversationId?: string }
Response: { response: string, conversationId: string }
```
Sends a message to the AI chatbot and receives a response.

### Clear Conversation
```
DELETE /api/chat/:conversationId
```
Clears conversation history for a given conversation ID.

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=3001

# Groq API (for fast LLM inference)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile

# Ollama (for embeddings)
OLLAMA_BASE_URL=http://localhost:11434
EMBEDDING_MODEL=nomic-embed-text
LLM_MODEL=llama3.2

# Case study passwords (hashed with SHA-256)
COUTTS_PASSWORD_HASH=your_hash_here
HSBC_PASSWORD_HASH=your_hash_here
SCHRODERS_PASSWORD_HASH=your_hash_here
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server (frontend only)
pnpm dev

# Run backend server
pnpm server

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm check

# Format code
pnpm format
```

## Setup Instructions

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Set Up Ollama (for local embeddings)
```bash
# Run the setup script
./setup-ollama.sh

# Or manually:
# Install Ollama: https://ollama.ai
ollama pull nomic-embed-text
ollama pull llama3.2
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your API keys and configuration.

### 4. Run Development Servers
```bash
# Terminal 1: Frontend
pnpm dev

# Terminal 2: Backend
pnpm server
```

Frontend will be available at http://localhost:3000
Backend API at http://localhost:3001

### 5. Build and Deploy
```bash
pnpm build
pnpm start
```

## Design Tokens

Custom CSS variables defined in `client/src/styles/design-tokens.css`:
- Color schemes (primary, secondary, accent, neutral)
- Typography scale
- Spacing scale
- Border radius tokens
- Animation durations
- Shadows and effects

## Code Splitting & Optimization

- Lazy-loaded page components using React.lazy()
- Manual chunk splitting for better caching:
  - vendor-react (React core)
  - vendor-router (Wouter)
  - vendor-ui (Radix UI)
  - vendor-motion (Framer Motion)
  - vendor-icons (Lucide React)
- Asset optimization with hashed filenames
- CSS and JS minification via esbuild

## Notable Implementation Details

### Custom Patches
- Wouter routing library has a custom patch (patches/wouter@3.7.1.patch)

### RAG Implementation
- Vector store uses in-memory storage (consider Redis for production)
- Embeddings generated via Ollama's nomic-embed-text model
- Cosine similarity for retrieval
- Context-aware responses with conversation history (last 10 messages)

### Security
- Password protection for sensitive case studies
- SHA-256 hashing for password verification
- CORS enabled for API access
- Static file serving with proper paths

### Performance
- Code splitting for optimal bundle sizes
- Lazy loading of routes and heavy components
- Image optimization and proper sizing
- CSS-in-JS with Tailwind for minimal runtime overhead

## Deployment Considerations

### Production Build
The build process creates:
- `/dist/public/` - Frontend static assets
- `/dist/index.js` - Backend server bundle

### Server Requirements
- Node.js environment
- Ollama instance (for embeddings) or fallback to mock embeddings
- Groq API key (for chat functionality)
- Environment variables configured

### Hosting Options
- **Frontend**: Can be served statically (Vercel, Netlify, S3)
- **Backend**: Requires Node.js server (Railway, Render, Heroku, VPS)
- **Full Stack**: Deploy both together (single server setup)

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- CSS custom properties required

## Accessibility
- Semantic HTML structure
- ARIA labels and roles via Radix UI
- Keyboard navigation support
- Focus management
- Color contrast compliance

## Future Enhancements
- Redis integration for conversation persistence
- More case studies
- Blog section
- Analytics integration
- Performance monitoring
- CI/CD pipeline

## Contact
David Phillip - UX Design Lead & Senior Product Designer
Portfolio showcases work with fintech companies including Coutts, HSBC, Schroders, and Cognism.
