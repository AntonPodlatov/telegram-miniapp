<template>
  <div class="home">
    <h1>📱 Добро пожаловать в Mini App!</h1>

    <div class="features">
      <div class="feature-card" v-for="feature in features" :key="feature.id">
        <div class="feature-icon">{{ feature.icon }}</div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>

    <div class="actions">
      <button @click="sendData" class="action-button primary">
        📨 Отправить данные в Telegram
      </button>

      <button @click="showAlert" class="action-button">
        🔔 Показать уведомление
      </button>

      <button @click="toggleTheme" class="action-button">
        🎨 Сменить тему
      </button>
    </div>

    <div v-if="responseMessage" class="response">
      <p>{{ responseMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTelegram } from '@/composables/useTelegram'
import { sendDataToApi } from '@/services/api'

const { isTelegram, showMainButton, hideMainButton, sendDataToTelegram } = useTelegram()
const responseMessage = ref('')

const features = [
  { id: 1, icon: '⚡', title: 'Быстро', description: 'Мгновенная загрузка' },
  { id: 2, icon: '🔒', title: 'Безопасно', description: 'Данные защищены' },
  { id: 3, icon: '🎯', title: 'Удобно', description: 'Работает в Telegram' }
]

const sendData = async () => {
  const data = {
    action: 'user_action',
    timestamp: new Date().toISOString(),
    payload: { test: 'data' }
  }

  if (isTelegram) {
    sendDataToTelegram(data)
    responseMessage.value = 'Данные отправлены в Telegram!'
  } else {
    // В режиме разработки шлем на наш API
    try {
      const result = await sendDataToApi(data)
      responseMessage.value = 'Данные отправлены на API: ' + result.message
    } catch (error) {
      responseMessage.value = 'Ошибка отправки: ' + error
    }
  }

  setTimeout(() => {
    responseMessage.value = ''
  }, 3000)
}

const showAlert = () => {
  if (isTelegram && window.Telegram?.WebApp) {
    window.Telegram.WebApp.showAlert('Привет из Mini App! 🚀')
  } else {
    alert('Привет из Mini App! 🚀')
  }
}

const toggleTheme = () => {
  if (isTelegram && window.Telegram?.WebApp) {
    const currentBg = window.Telegram.WebApp.backgroundColor
    const newColor = currentBg === '#ffffff' ? '#1a1a1a' : '#ffffff'
    window.Telegram.WebApp.setBackgroundColor(newColor)
  }
}

// Показываем главную кнопку Telegram при загрузке
showMainButton('Отправить данные', sendData)

// Убираем кнопку при покидании страницы
import { onBeforeUnmount } from 'vue'
onBeforeUnmount(() => {
  hideMainButton()
})
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 30px;
  text-align: center;
  color: var(--tg-theme-text-color);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.feature-card {
  background: var(--tg-theme-secondary-bg-color);
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.feature-card h3 {
  margin-bottom: 10px;
  color: var(--tg-theme-text-color);
}

.feature-card p {
  color: var(--tg-theme-hint-color);
  font-size: 14px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.action-button {
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
  background: var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-text-color);
}

.action-button:hover {
  opacity: 0.9;
}

.action-button.primary {
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
}

.response {
  padding: 16px;
  background: var(--tg-theme-secondary-bg-color);
  border-radius: 12px;
  text-align: center;
  margin-top: 20px;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>