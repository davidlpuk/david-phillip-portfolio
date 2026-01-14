#!/bin/bash

# Setup script for David's Digital Twin Chatbot
# This script installs Ollama and required models

set -e

echo "🦙 Setting up Ollama for David's Digital Twin..."
echo ""

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "📦 Installing Ollama..."
    curl -fsSL https://ollama.ai/install.sh | sh
else
    echo "✅ Ollama is already installed"
fi

echo ""
echo "⬇️  Downloading required models (this may take a few minutes)..."
echo ""

# Pull the embedding model (nomic-embed-text - efficient and high quality)
echo "📊 Pulling nomic-embed-text for embeddings..."
ollama pull nomic-embed-text

# Pull the LLM model (llama3.2 - good balance of speed and quality)
echo "🧠 Pulling llama3.2 for responses..."
ollama pull llama3.2

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the chat server:"
echo "  pnpm run server"
echo ""
echo "To start the frontend:"
echo "  pnpm run dev"
echo ""
echo "The chatbot will be available at http://localhost:5173"
echo "The API server runs at http://localhost:3001"
