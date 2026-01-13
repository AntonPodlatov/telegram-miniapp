//src/views/tabs/SwipeTab.vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import SwipeDeck from '../components/SwipeDeck.vue'

const profiles = ref<Profile[]>([
  {
    name: 'Maria',
    age: 27,
    gender: 'female',
    showGender: 'male',
    purpose: 'dating',
    photos: ['/mock/1.jpg', '/mock/2.jpg']
  },
  {
    name: 'Xenia',
    age: 27,
    gender: 'female',
    showGender: 'male',
    purpose: 'dating',
    photos: ['/mock/1.jpg', '/mock/2.jpg']
  },
  {
    name: 'Snezhana',
    age: 32,
    gender: 'female',
    showGender: 'male',
    purpose: 'dating',
    photos: ['/mock/1.jpg', '/mock/2.jpg']
  },
  {
    name: 'Alina',
    age: 30,
    gender: 'female',
    showGender: 'male',
    purpose: 'dating',
    photos: ['/mock/1.jpg', '/mock/2.jpg']
  }
])

const index = ref(0);
const history = ref<number[]>([]);

const current = computed(() => profiles.value[index.value]);
const next = computed(() => profiles.value[index.value + 1]);

const onSwipe = (type: 'like' | 'dislike') => {
  history.value.push(index.value);

  setTimeout(() => {
    index.value++;
  }, 250);
}

const back = () => {
  const prev = history.value.pop();
  if (prev !== undefined) {
    index.value = prev;
  }
}
</script>

<template>
  <SwipeDeck
      :current="current ?? null"
      :next="next ?? null"
      @swipe="onSwipe"
      @back="back"
  />
</template>