import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
      '/api': {        
        target: 'http://103.47.185.115:9000',
        // target: 'http://127.0.0.1:8000',
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        changeOrigin: true,
      },

    }
})
