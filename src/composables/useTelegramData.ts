import { ref } from 'vue'
import { useTelegram } from './useTelegram'

export function useTelegramData() {
    const { sendData } = useTelegram()

    const sending = ref(false)
    const error = ref<string | null>(null)

    const send = async (payload: any) => {
        sending.value = true
        error.value = null

        try {
            sendData({
                ...payload,
                ts: Date.now()
            })
            return true
        } catch (e: any) {
            error.value = e.message
            return false
        } finally {
            sending.value = false
        }
    }

    return {
        sending,
        error,
        send
    }
}
