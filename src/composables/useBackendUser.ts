import { ref } from 'vue'
import { useTelegram } from '@/composables/useTelegram'

export function useBackendUser() {
    const tg = useTelegram();

    const user = ref<User | null>(null);
    const isLoaded = ref(false);

    const load = async () => {
        if (!tg.userId.value) return;

        // МОК бэка
        const raw = localStorage.getItem(`profile_${tg.userId.value}`);

        if (!raw) {
            user.value = null;
            isLoaded.value = true;
            return;
        }

        user.value = JSON.parse(raw);
        isLoaded.value = true;
    }

    return {user, isLoaded, load};
}