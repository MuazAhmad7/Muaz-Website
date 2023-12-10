import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import font from './assets/Sketch.ttf'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Muaz-Website/',
  plugins: [react()],
  build: {
    outDir: 'dist', // Specify the output directory
    chunkSizeWarningLimit: 1600,
  }
})
