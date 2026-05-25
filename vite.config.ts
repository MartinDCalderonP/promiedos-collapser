import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'

const CURRENT_FILE_PATH: string = fileURLToPath(import.meta.url)
const CURRENT_DIR: string = dirname(CURRENT_FILE_PATH)

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(CURRENT_DIR, 'src/content/content-script.ts'),
      fileName: () => 'content.js',
      formats: ['iife'],
      name: 'PromiedosCollapser'
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        extend: true
      }
    },
    sourcemap: true
  },
  publicDir: 'public'
})
