import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  build: {
    outDir: 'dist', // Specify the output directory
    chunkSizeWarningLimit: 1600,
  }
})