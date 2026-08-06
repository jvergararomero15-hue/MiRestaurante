import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/auth': 'http://localhost:8080',
      '/clientes': 'http://localhost:8080',
      '/mesas': 'http://localhost:8080',
      '/platos': 'http://localhost:8080',
      '/pedidos': 'http://localhost:8080',
      '/reservas': 'http://localhost:8080',
      '/usuarios': 'http://localhost:8080'
    }
  }
})
