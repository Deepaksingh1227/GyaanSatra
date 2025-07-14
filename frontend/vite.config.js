import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Add server.proxy to forward API requests to backend
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // 🔁 proxy /api calls to backend
    },
  },
});
