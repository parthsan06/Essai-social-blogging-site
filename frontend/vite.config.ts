import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'
import ssrPlugin from 'vite-ssr-components/plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react(), cloudflare(), ssrPlugin(), tailwindcss()],
    resolve: {
    dedupe: ['react', 'react-dom']
  },
  build: {
  rollupOptions: {
    input: {
      client: './src/client.tsx'
    },
    output: {
      entryFileNames: 'assets/client.js',
      chunkFileNames: 'assets/[name].js',
      assetFileNames: 'assets/[name].[ext]'
    }
  }
}
})
