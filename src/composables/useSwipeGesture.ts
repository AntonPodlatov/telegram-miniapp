import {computed, ref} from 'vue'

export function useSwipeGesture(
    onSwipe: (type: 'like' | 'dislike') => void,
    threshold = 120
) {
    const x = ref(0)
    const y = ref(0)
    const dragging = ref(false)

    const progress = computed(() => {
        return Math.min(Math.abs(x.value) / threshold, 1)
    })

    const start = () => {
        dragging.value = true
    }

    const move = (e: PointerEvent) => {
        if (!dragging.value) return
        x.value += e.movementX
        y.value += e.movementY
    }

    const end = () => {
        if (!dragging.value) return
        dragging.value = false

        if (x.value > 120) swipe('like')
        else if (x.value < -120) swipe('dislike')
        else reset()
    }

    const swipe = (type: 'like' | 'dislike') => {
        x.value = type === 'like' ? 1000 : -1000
        onSwipe(type)
    }

    const reset = () => {
        x.value = 0
        y.value = 0
    }

    return {
        x,
        y,
        progress,
        start,
        move,
        end,
        swipe,
        reset
    }
}
