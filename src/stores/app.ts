import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const useAppStore = defineStore('app', () => {
    // Состояние
    const isLoading = ref(false)
    const theme = ref('light')
    const notifications = ref<any[]>([])

    // Геттеры
    const unreadNotifications = computed(() => {
        return notifications.value.filter(n => !n.read).length
    })

    // Действия
    const setLoading = (loading: boolean) => {
        isLoading.value = loading
    }

    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
        // Здесь можно добавить логику изменения темы в Telegram
        if (window.Telegram?.WebApp) {
            const color = theme.value === 'dark' ? '#1a1a1a' : '#ffffff'
            window.Telegram.WebApp.setBackgroundColor(color)
        }
    }

    const addNotification = (notification: any) => {
        notifications.value.unshift({
            ...notification,
            id: Date.now(),
            read: false,
            timestamp: new Date().toISOString()
        })
    }

    const markAsRead = (id: number) => {
        const notification = notifications.value.find(n => n.id === id)
        if (notification) {
            notification.read = true
        }
    }

    return {
        // Состояние
        isLoading,
        theme,
        notifications,

        // Геттеры
        unreadNotifications,

        // Действия
        setLoading,
        toggleTheme,
        addNotification,
        markAsRead
    }
})