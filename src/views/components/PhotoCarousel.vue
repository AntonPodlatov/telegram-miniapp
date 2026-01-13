src/views/components/PhotoCarousel.vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ photos: string[] }>()

const index = ref(0)
const current = computed(() => props.photos[index.value])
</script>

<template>
  <div class="carousel">
    <img :src="current" />

    <div class="zones">
      <div class="left" @click.stop="index = (index - 1 + photos.length) % photos.length" />
      <div class="right" @click.stop="index = (index + 1) % photos.length" />
    </div>

    <div class="bars">
      <span
          v-for="(_, i) in photos"
          :key="i"
          :class="{ active: i === index }"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel {
  position: absolute;
  inset: 0;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.zones {
  position: absolute;
  inset: 0;
  display: flex;
}

.left, .right {
  flex: 1;
}

.bars {
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
}

.bars span {
  flex: 1;
  height: 2px;
  background: rgba(255,255,255,.4);
}

.bars span.active {
  background: #fff;
}
</style>
