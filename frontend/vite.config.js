import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/account': 'http://localhost:8000',
      '/products': 'http://localhost:8000',
      '/shopping': 'http://localhost:8000',
      '/family': 'http://localhost:8000',
    }
  }
})
