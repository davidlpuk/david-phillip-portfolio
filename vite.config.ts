import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig, Plugin } from "vite";

function markdownPlugin(): Plugin {
  return {
    name: "markdown-raw",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith(".md")) {
        return {
          code: `export default ${JSON.stringify(code)}`,
          map: null,
        };
      }
    },
  };
}

const plugins = [react(), tailwindcss(), jsxLocPlugin(), markdownPlugin()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "apps", "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "packages", "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "apps", "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Enable build optimizations
    minify: "esbuild",
    target: "esnext",
    cssMinify: true,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["wouter"],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tooltip",
          ],
          "vendor-motion": ["framer-motion"],
          "vendor-icons": ["lucide-react"],
        },
        // Asset naming for better caching
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? "asset";
          const info = name.split(".");
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|webp|ico)$/.test(name)) {
            return `images/[name]-[hash].[ext]`;
          }
          if (/\.css$/.test(name)) {
            return `css/[name]-[hash].[ext]`;
          }
          return `[name]-[hash].[ext]`;
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
      },
    },
    manifest: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3001 is busy
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "lucide-react"],
  },
});
