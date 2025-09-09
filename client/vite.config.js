import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // ✅ Development server configuration
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Backend server for local dev
        changeOrigin: true,
        secure: false
      }
    },
    hmr: {
      overlay: false  // Disable HMR overlay
    }
  },

  // ✅ Production build output for Vercel
  build: {
    outDir: 'dist',  // Vite build folder
  }
});
