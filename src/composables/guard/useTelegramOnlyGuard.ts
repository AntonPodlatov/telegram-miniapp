import { ref } from 'vue'
import { useTelegram } from '@/composables/useTelegram.ts'
import { useBackendUser } from '@/composables/useBackendUser.ts'

export function useTelegramOnlyGuard() {
    const tg = useTelegram()
    const userData = useBackendUser()

    const state = ref<'checking' | 'not-telegram' | 'onboarding' | 'ready'>(
        'checking'
    )

    const check = async () => {
        if (!tg.isTelegram.value || !tg.userId.value) {
            state.value = 'not-telegram'
            return
        }

        await userData.load()

        if (!userData.user.value) {
            state.value = 'onboarding'
            return
        }

        state.value = 'ready'
    }

    return { state, userData, check }
}
