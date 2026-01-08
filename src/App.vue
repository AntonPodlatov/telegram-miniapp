<template>
  <div id="app" :class="{ 'telegram-app': isTelegram }">
    <!-- Шапка с информацией о пользователе -->
    <header v-if="user" class="app-header">
      <div class="user-info">
        <div class="avatar-placeholder">
          {{ user.first_name?.[0] }}{{ user.last_name?.[0] }}
        </div>
        <div class="user-details">
          <h2>{{ user.first_name }} {{ user.last_name }}</h2>
          <p v-if="user.username">@{{ user.username }}</p>
        </div>
      </div>
    </header>

    <!-- Основное содержимое -->
    <main class="app-main">
      <RouterView />
    </main>

    <!-- Информация о режиме (только в разработке) -->
    <div v-if="!isTelegram" class="dev-mode">
      <p>⚡ Режим разработки (вне Telegram)</p>
      <button @click="simulateTelegramData" class="dev-button">
        Имитировать данные Telegram
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTelegram } from '@/composables/useTelegram'

const { isTelegram, user, sendDataToTelegram } = useTelegram()

const simulateTelegramData = () => {
  sendDataToTelegram({
    action: 'test',
    message: 'Тестовые данные из режима разработки',
    timestamp: Date.now()
  })
  alert('Данные отправлены (в консоль)')
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --tg-theme-bg-color: #ffffff;
  --tg-theme-text-color: #000000;
  --tg-theme-hint-color: #999999;
  --tg-theme-link-color: #3390ec;
  --tg-theme-button-color: #3390ec;
  --tg-theme-button-text-color: #ffffff;
  --tg-theme-secondary-bg-color: #f1f1f1;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  min-height: 100vh;
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
}

.telegram-app {
  /* Telegram-специфичные стили */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

.app-header {
  background: var(--tg-theme-secondary-bg-color);
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.user-details h2 {
  font-size: 18px;
  margin-bottom: 4px;
}

.user-details p {
  color: var(--tg-theme-hint-color);
  font-size: 14px;
}

.app-main {
  padding: 20px;
}

.dev-mode {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffcc00;
  color: #333;
  padding: 12px;
  text-align: center;
  font-size: 14px;
}

.dev-button {
  background: #333;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  margin-top: 8px;
  cursor: pointer;
  font-size: 14px;
}

.dev-button:hover {
  background: #444;
}
</style>