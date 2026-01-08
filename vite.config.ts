import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const repoName = 'telegram-miniapp' // <-- ИМЯ РЕПОЗИТОРИЯ

export default defineConfig(({ mode }) => ({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // ⚠️ КРИТИЧНО для GitHub Pages
  base: mode === 'production' ? `/${repoName}/` : '/',

  build: {
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          telegram: ['@twa-dev/sdk'],
        },
      },
    },
  },
}))
