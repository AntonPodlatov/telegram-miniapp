import { ref, onUnmounted } from 'vue'
import { useTelegram } from './useTelegram'

export function useTelegramBackButton() {
    const { webApp } = useTelegram()
    const visible = ref(false)

    let handler: (() => void) | null = null

    const onClick = (cb: () => void) => {
        if (!webApp.value?.BackButton) return

        if (handler) {
            webApp.value.BackButton.offClick(handler)
        }

        handler = cb
        webApp.value.BackButton.onClick(cb)
    }

    onUnmounted(() => {
        if (handler && webApp.value?.BackButton) {
            webApp.value.BackButton.offClick(handler)
        }
    })

    return {
        visible,
        show: () => {
            visible.value = true
            webApp.value?.BackButton.show()
        },
        hide: () => {
            visible.value = false
            webApp.value?.BackButton.hide()
        },
        onClick
    }
}
