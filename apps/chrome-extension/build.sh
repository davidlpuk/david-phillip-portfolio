#!/bin/bash

# Improved Build Script for Chrome Extension
# Optimizes build process with proper code splitting and minification

set -e  # Exit on error

echo "🚀 Starting Chrome Extension build..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Create directories
echo "📁 Creating directories..."
mkdir -p dist

# Build popup (React app)
echo "🔨 Building popup..."
npm run build:popup

# Build content script with tree-shaking
echo "🔨 Building content script..."
esbuild src/content/ContentScript.ts \
  --bundle \
  --outfile=dist/content.js \
  --format=iife \
  --target=es2020 \
  --minify \
  --tree-shaking=true \
  --loader:.ts=ts \
  --platform=browser \
  --external:react \
  --external:react-dom \
  --inject:./esbuild-shims.js

# Build article parser (separate chunk for better caching)
echo "🔨 Building article parser..."
esbuild src/content/article-parser.ts \
  --bundle \
  --outfile=dist/article-parser.js \
  --format=iife \
  --target=es2020 \
  --minify \
  --tree-shaking=true \
  --loader:.ts=ts \
  --platform=browser

# Build background service worker
echo "🔨 Building background service worker..."
esbuild src/background/BackgroundService.ts \
  --bundle \
  --outfile=dist/background.js \
  --format=iife \
  --target=es2020 \
  --minify \
  --tree-shaking=true \
  --loader:.ts=ts \
  --platform=browser \
  --define:process.env.NODE_ENV='"production"'

# Build utility files (separate chunks for better caching)
echo "🔨 Building utilities..."
esbuild src/utils/md-converter.ts \
  --bundle \
  --outfile=dist/md-converter.js \
  --format=iife \
  --target=es2020 \
  --minify \
  --tree-shaking=true \
  --loader:.ts=ts \
  --platform=browser

esbuild src/utils/sanitizer.ts \
  --bundle \
  --outfile=dist/sanitizer.js \
  --format=iife \
  --target=es2020 \
  --minify \
  --tree-shaking=true \
  --loader:.ts=ts \
  --platform=browser

esbuild src/utils/logger.ts \
  --bundle \
  --outfile=dist/logger.js \
  --format=iife \
  --target=es2020 \
  --minify \
  --tree-shaking=true \
  --loader:.ts=ts \
  --platform=browser

# Copy assets
echo "📋 Copying assets..."
cp src/manifest/manifest.json dist/
cp -r icons dist/

# Rename index.html to popup.html
if [ -f dist/index.html ]; then
  mv dist/index.html dist/popup.html
  echo "✅ Renamed index.html to popup.html"
fi

# Generate build info
echo "📊 Generating build info..."
cat > dist/build-info.json << EOF
{
  "buildDate": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "version": "$(node -p "require('./package.json').version")",
  "commit": "$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')",
  "environment": "production"
}
EOF

# Calculate bundle sizes
echo "📦 Bundle sizes:"
du -sh dist/*.js | sort -h

echo "✅ Build complete!"
echo ""
echo "🎉 Extension is ready in ./dist"
echo "📦 Load it in Chrome: chrome://extensions → Developer mode → Load unpacked"
