import { ref, onMounted, computed } from 'vue'

export function useTelegram() {
    const isTelegram = ref(false)
    const user = ref<any>(null)
    const isReady = ref(false)
    const tg = ref<any>(null)
    const mainButton = ref<any>(null)
    const backButton = ref<any>(null)

    // Инициализация Telegram Web App
    const initTelegram = () => {
        try {
            // Проверяем, запущено ли в Telegram
            if (window.Telegram?.WebApp) {
                tg.value = window.Telegram.WebApp
                isTelegram.value = true

                // Получаем данные пользователя
                user.value = tg.value.initDataUnsafe?.user || null

                // Инициализируем кнопки
                initButtons()

                // Настраиваем интерфейс
                setupTelegramUI()

                console.log('Telegram Web App инициализирован', user.value)
            } else {
                console.warn('Запущено вне Telegram. Режим разработки.')
                // Заглушка для разработки
                user.value = {
                    id: 123456789,
                    first_name: 'Тестовый',
                    last_name: 'Пользователь',
                    username: 'test_user',
                    language_code: 'ru'
                }
            }

            isReady.value = true
        } catch (error) {
            console.error('Ошибка инициализации Telegram:', error)
            isReady.value = true
        }
    }

    // Инициализация кнопок
    const initButtons = () => {
        if (!isTelegram.value || !tg.value) return

        // Создаем заглушки для кнопок если нет нативных методов
        mainButton.value = {
            show: () => {
                if (tg.value?.MainButton) {
                    tg.value.MainButton.show()
                }
            },
            hide: () => {
                if (tg.value?.MainButton) {
                    tg.value.MainButton.hide()
                }
            },
            setText: (text: string) => {
                if (tg.value?.MainButton) {
                    tg.value.MainButton.setText(text)
                }
            },
            onClick: (callback: () => void) => {
                if (tg.value?.MainButton) {
                    tg.value.MainButton.onClick(callback)
                }
            },
            showProgress: () => {
                if (tg.value?.MainButton) {
                    tg.value.MainButton.showProgress()
                }
            },
            hideProgress: () => {
                if (tg.value?.MainButton) {
                    tg.value.MainButton.hideProgress()
                }
            }
        }

        backButton.value = {
            show: () => {
                if (tg.value?.BackButton) {
                    tg.value.BackButton.show()
                }
            },
            hide: () => {
                if (tg.value?.BackButton) {
                    tg.value.BackButton.hide()
                }
            },
            onClick: (callback: () => void) => {
                if (tg.value?.BackButton) {
                    tg.value.BackButton.onClick(callback)
                }
            }
        }
    }

    // Настройка UI элементов Telegram
    const setupTelegramUI = () => {
        if (!isTelegram.value || !tg.value) return

        // Расширяем на весь экран
        tg.value.expand()

        // Устанавливаем цвет фона
        tg.value.setBackgroundColor('#ffffff')

        // Говорим Telegram, что приложение готово
        tg.value.ready()
    }

    // Метод для отправки данных в Telegram
    const sendDataToTelegram = (data: any) => {
        if (isTelegram.value && tg.value) {
            tg.value.sendData(JSON.stringify(data))
        } else {
            console.log('Данные для отправки в Telegram:', data)
        }
    }

    // Метод для закрытия приложения
    const closeApp = () => {
        if (isTelegram.value && tg.value) {
            tg.value.close()
        }
    }

    // Метод для показа алерта
    const showAlert = (message: string) => {
        if (isTelegram.value && tg.value) {
            tg.value.showAlert(message)
        } else {
            alert(message)
        }
    }

    // Методы для работы с главной кнопкой
    const showMainButton = (text: string = 'Подтвердить', onClick?: () => void) => {
        if (mainButton.value) {
            mainButton.value.setText(text)
            if (onClick) {
                mainButton.value.onClick(onClick)
            }
            mainButton.value.show()
        } else if (!isTelegram.value) {
            console.log('Main button would show with text:', text)
        }
    }

    const hideMainButton = () => {
        if (mainButton.value) {
            mainButton.value.hide()
        } else if (!isTelegram.value) {
            console.log('Main button would hide')
        }
    }

    // Методы для работы с кнопкой "Назад"
    const showBackButton = (onClick?: () => void) => {
        if (backButton.value) {
            if (onClick) {
                backButton.value.onClick(onClick)
            }
            backButton.value.show()
        }
    }

    const hideBackButton = () => {
        if (backButton.value) {
            backButton.value.hide()
        }
    }

    // Геттер для telegram объекта с безопасной проверкой
    const telegram = computed(() => {
        if (isTelegram.value && window.Telegram?.WebApp) {
            return window.Telegram.WebApp
        }
        return null
    })

    onMounted(() => {
        initTelegram()
    })

    return {
        isTelegram,
        user,
        isReady,
        tg,
        telegram,
        sendDataToTelegram,
        closeApp,
        showAlert,
        showMainButton,
        hideMainButton,
        showBackButton,
        hideBackButton
    }
}