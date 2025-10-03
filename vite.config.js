import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { copyFileSync, existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Plugin to copy service worker to output
function copyServiceWorker() {
  return {
    name: 'copy-service-worker',
    closeBundle: async () => {
      const src = resolve(__dirname, 'src/sw.js')
      const dest = resolve(__dirname, 'docs/sw.js')
      
      if (existsSync(src)) {
        copyFileSync(src, dest)
        console.log('✅ Service worker copied to output directory')
      }
    }
  }
}

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}']
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'MealPlanner',
        short_name: 'MealPlanner',
        description: 'A PWA for meal planning with local SQLite storage',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    copyServiceWorker()
  ],
  
  // Standard /src → /docs pattern
  root: 'src',
  publicDir: '../public',
  base: './',
  
  // Ensure sql.js WASM files are properly handled
  assetsInclude: ['**/*.wasm'],
  
  // Build configuration
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Generate unique filenames for better cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          'sql.js': ['sql.js']
        }
      }
    }
  },
  
  // Development server configuration
  server: {
    port: 3004,        // Registered in PORT_REGISTRY.md
    host: '0.0.0.0',   // Allow network access
    strictPort: true,  // Fail fast if port is taken (prevents conflicts)
    hmr: {
      overlay: false
    },
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      // Disable caching for development
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  },
  
  preview: {
    port: 3005
  }
})
