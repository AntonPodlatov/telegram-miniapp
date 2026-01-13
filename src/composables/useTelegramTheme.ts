import { ref, computed, watchEffect } from 'vue'
import { useTelegram } from './useTelegram'

export function useTelegramTheme() {
    const { webApp, theme } = useTelegram()

    const bg = ref('#fff')
    const text = ref('#000')
    const button = ref('#2481cc')
    const buttonText = ref('#fff')

    const isDark = computed(() => theme.value === 'dark')

    const apply = () => {
        if (!webApp.value) return
        const p = webApp.value.themeParams

        bg.value = p.bg_color ?? bg.value
        text.value = p.text_color ?? text.value
        button.value = p.button_color ?? button.value
        buttonText.value = p.button_text_color ?? buttonText.value

        const root = document.documentElement
        root.style.setProperty('--tg-bg', bg.value)
        root.style.setProperty('--tg-text', text.value)
        root.style.setProperty('--tg-button', button.value)
        root.style.setProperty('--tg-button-text', buttonText.value)
    }

    watchEffect(apply)

    return {
        bg,
        text,
        button,
        buttonText,
        isDark
    }
}
