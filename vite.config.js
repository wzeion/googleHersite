import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server:{
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    allowedHosts: ['googlehersite.onrender.com'],
    proxy:{
      '/api/users/':{
        target:'https://hackathon-backend-hm3i.onrender.com',
        changeOrigin:true,
        // rewrite: (path) => path.replace(/^\/api/, ''), 
      }
    }
  }
})
