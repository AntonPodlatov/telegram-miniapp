import axios from 'axios'

// Базовый URL API (будет меняться в зависимости от окружения)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Создаем экземпляр axios с настройками
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Интерфейсы для типизации
interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

interface UserData {
    id?: number
    first_name?: string
    last_name?: string
    username?: string
    language_code?: string
}

// Методы API
export const apiService = {
    // Получение данных пользователя
    async getUserData(initData?: string): Promise<ApiResponse<UserData>> {
        try {
            const response = await api.get('/user', {
                headers: initData ? { 'X-Telegram-Init-Data': initData } : {}
            })
            return response.data
        } catch (error) {
            console.error('Error fetching user data:', error)
            return {
                success: false,
                error: 'Failed to fetch user data'
            }
        }
    },

    // Отправка данных
    async sendData(payload: any, initData?: string): Promise<ApiResponse> {
        try {
            const response = await api.post('/data', payload, {
                headers: initData ? { 'X-Telegram-Init-Data': initData } : {}
            })
            return response.data
        } catch (error) {
            console.error('Error sending data:', error)
            return {
                success: false,
                error: 'Failed to send data'
            }
        }
    },

    // Получение контента
    async getContent(contentType: string): Promise<ApiResponse> {
        try {
            const response = await api.get(`/content/${contentType}`)
            return response.data
        } catch (error) {
            console.error('Error fetching content:', error)
            return {
                success: false,
                error: 'Failed to fetch content'
            }
        }
    }
}

// Упрощенная функция для отправки данных (для примера)
export async function sendDataToApi(data: any): Promise<any> {
    // В продакшене это будет реальный вызов API
    // Для демо возвращаем промис
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Данные получены на сервере',
                timestamp: new Date().toISOString(),
                receivedData: data
            })
        }, 500)
    })
}