import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: '0.0.0.0',  // Expone el servidor a conexiones externas (necesario para V0)
    port: 3000,
    strictPort: true,
  }
})