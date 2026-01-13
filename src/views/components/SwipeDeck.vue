//src/views/components/SwipeDeck.vue
<script setup lang="ts">
import { ref } from 'vue'
import SwipeCard from './SwipeCard.vue'

defineProps<{
  current: Profile | null
  next: Profile | null
}>()

defineEmits<{
  (e: 'swipe', type: 'like' | 'dislike'): void
}>()

const scale = ref(0.94)
</script>

<template>
  <div class="deck">
    <SwipeCard
        v-if="next"
        :profile="next"
        :is-background="true"
        :style="{ transform: `scale(${scale})` }"
    />

    <SwipeCard
        v-if="current"
        :key="current.name"
        :profile="current"
        @progress="v => scale = 0.94 + v * 0.06"
        @swipe="$emit('swipe', $event)"
    />
  </div>
</template>

<style scoped>
.deck {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
