import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Importing tailwindcss and autoprefixer using ES Module syntax
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
})
