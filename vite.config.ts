import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  build: {
    manifest: true,
    outDir: "public/vite",
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      input: './web/src/main.tsx',
    }
  },
  plugins: [react()],

})
