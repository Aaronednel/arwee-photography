import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/motion')) return 'motion'
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/zod') || id.includes('@hookform')) {
            return 'forms'
          }
          if (id.includes('node_modules/lucide-react')) return 'icons'
        },
      },
    },
  },
})
