import { ref, onUnmounted } from 'vue'
import { useTelegram } from './useTelegram'

export function useTelegramMainButton() {
    const { webApp } = useTelegram()

    const text = ref('')
    const visible = ref(false)
    const loading = ref(false)
    const enabled = ref(true)

    let clickHandler: (() => void) | null = null

    const update = () => {
        if (!webApp.value?.MainButton) return
        const btn = webApp.value.MainButton

        btn.setText(text.value)
        visible.value ? btn.show() : btn.hide()
        enabled.value ? btn.enable() : btn.disable()
        loading.value ? btn.showProgress() : btn.hideProgress()
    }

    const onClick = (cb: () => void) => {
        if (!webApp.value?.MainButton) return

        if (clickHandler) {
            webApp.value.MainButton.offClick(clickHandler)
        }

        clickHandler = cb
        webApp.value.MainButton.onClick(cb)
    }

    onUnmounted(() => {
        if (clickHandler && webApp.value?.MainButton) {
            webApp.value.MainButton.offClick(clickHandler)
        }
    })

    return {
        text,
        visible,
        loading,
        enabled,

        show: () => { visible.value = true; update() },
        hide: () => { visible.value = false; update() },
        enable: () => { enabled.value = true; update() },
        disable: () => { enabled.value = false; update() },
        showProgress: () => { loading.value = true; update() },
        hideProgress: () => { loading.value = false; update() },
        setText: (v: string) => { text.value = v; update() },
        onClick
    }
}
