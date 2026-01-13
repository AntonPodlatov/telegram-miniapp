import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const repoName = 'telegram-miniapp'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  base: mode === 'production' ? `/${repoName}/` : '/',
  server: {
    host: true,
    allowedHosts: [
      '.ngrok-free.app',
      '.trycloudflare.com'
    ],
  },
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
