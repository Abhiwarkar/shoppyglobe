import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    port: 3000,
    open: true, // Automatically open browser
    host: true, // Allow external connections
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    
    // Rollup options
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
    
    // Build optimizations
    chunkSizeWarningLimit: 1000,
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    open: true,
  },
  
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  
  // CSS configuration
  css: {
    devSourcemap: true,
  },
})