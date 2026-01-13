//telegram-miniapp/src/views/components/SwipeCard.vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import PhotoCarousel from './PhotoCarousel.vue'

const props = defineProps<{
  profile: Profile
  isBackground?: boolean
}>()

const emit = defineEmits<{
  (e: 'swipe', type: 'like' | 'dislike'): void
  (e: 'progress', value: number): void
}>()

const x = ref(0)
const y = ref(0)
const startX = ref(0)
const startY = ref(0)
const dragging = ref(false)
const swiped = ref(false)

const THRESHOLD = 100

const style = computed(() => ({
  transform: `translate(${x.value}px, ${y.value}px) rotate(${x.value / 12}deg)`
}))

function onTouchStart(e: TouchEvent) {
  if (props.isBackground || swiped.value) return

  const t = e.touches[0]
  startX.value = t.clientX
  startY.value = t.clientY
  dragging.value = true
}

function onTouchMove(e: TouchEvent) {
  if (!dragging.value || swiped.value || props.isBackground) return

  const t = e.touches[0]
  x.value = t.clientX - startX.value
  y.value = t.clientY - startY.value

  emit('progress', Math.min(Math.abs(x.value) / THRESHOLD, 1))
}

function onTouchEnd() {
  if (!dragging.value || swiped.value || props.isBackground) return
  dragging.value = false

  if (x.value > THRESHOLD) commit('like')
  else if (x.value < -THRESHOLD) commit('dislike')
  else reset()
}

function commit(type: 'like' | 'dislike') {
  swiped.value = true
  x.value = type === 'like' ? 1000 : -1000
  emit('progress', 1)
  emit('swipe', type)
}

function reset() {
  x.value = 0
  y.value = 0
  emit('progress', 0)
}
</script>

<template>
  <div
      class="swipe-card"
      :style="style"
      @touchstart.passive="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
  >
    <PhotoCarousel :photos="profile.photos" />

    <div class="info">
      <strong>{{ profile.name }}, {{ profile.age }}</strong>
    </div>
  </div>
</template>

<style scoped>
.swipe-card {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
}
</style>
