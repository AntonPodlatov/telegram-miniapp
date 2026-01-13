import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { EventNames } from '@twa-dev/types';

let instance: ReturnType<typeof createTelegram> | null = null;

function createTelegram() {
    const isReady = ref(false);
    const theme = ref<'light' | 'dark'>('light');
    const viewportHeight = ref(0);
    const isExpanded = ref(false);

    const isTelegram = computed(() => {
        if (typeof window === 'undefined') {
            return false;
        }

        const tg = window.Telegram?.WebApp;

        return !!tg && tg.initData !== '';
    });

    const webApp = computed(() => {
        if (isTelegram.value && window.Telegram && window.Telegram.WebApp) {
            return window.Telegram.WebApp;
        } else {
            return null;
        }
    });

    const init = () => {
        if (!webApp.value || isReady.value) {
            return;
        }

        try {
            webApp.value.ready();
            webApp.value.expand();

            theme.value = webApp.value.colorScheme;
            viewportHeight.value = webApp.value.viewportHeight;
            isExpanded.value = webApp.value.isExpanded;
            isReady.value = true;

            console.log('[Telegram] WebApp ready');
        } catch (e) {
            console.error('[Telegram] init error', e);
        }
    }

    /* ---------------- events ---------------- */

    const handlers = new Map<EventNames, (...args: any[]) => void>();

    const onEvent = <T extends EventNames>(name: T, cb: (...args: any[]) => void) => {
        if (!webApp.value) {
            return;
        }

        const prev = handlers.get(name);

        if (prev) {
            webApp.value.offEvent(name, prev);
        }

        handlers.set(name, cb);
        webApp.value.onEvent(name, cb);
    }

    const offEvent = <T extends EventNames>(name: T) => {
        if (!webApp.value) {
            return;
        }

        const cb = handlers.get(name);

        if (cb) {
            webApp.value.offEvent(name, cb as any);
            handlers.delete(name);
        }
    }

    onMounted(() => {
        init();

        if (!webApp.value) return;

        onEvent('themeChanged', () => theme.value = webApp.value!.colorScheme);

        onEvent('viewportChanged', () => {
            viewportHeight.value = webApp.value!.viewportHeight;
            isExpanded.value = webApp.value!.isExpanded;
        });
    });

    onUnmounted(() => handlers.forEach((_, key) => offEvent(key)));

    /* ---------------- helpers ---------------- */

    const closeApp = () => webApp.value?.close();

    const showAlert = (message: string) => webApp.value ?
        webApp.value.showAlert(message) :
        alert(message);


    const showConfirm = (message: string): Promise<boolean> => !webApp.value ?
        Promise.resolve(confirm(message)) :
        new Promise(resolve => webApp.value!.showConfirm(message, resolve));


    const sendData = (data: unknown) => {
        if (!webApp.value) {
            console.log('[Telegram] mock sendData', data);
            return;
        }

        try {
            webApp.value.sendData(JSON.stringify(data));
        } catch (e) {
            console.error('[Telegram] sendData error', e);
        }
    }

    const user = computed(() => webApp.value?.initDataUnsafe?.user ?? null);
    const userId = computed(() => user.value?.id ?? null);
    const launchParams = computed(() => webApp.value?.initDataUnsafe ?? {});

    return {
        isTelegram,
        isReady,
        theme,
        viewportHeight,
        isExpanded,

        webApp,
        user,
        userId,
        launchParams,

        init,
        closeApp,
        showAlert,
        showConfirm,
        sendData,

        onEvent,
        offEvent
    }
}

export function useTelegram() {
    if (!instance) {
        instance = createTelegram();
    }

    return instance;
}