<script setup lang="ts">
defineEmits(['back', 'dislike', 'like'])
</script>

<template>
  <div class="actions">
    <button @click="$emit('back')">↩</button>
    <button @click="$emit('dislike')">✖</button>
    <button @click="$emit('like')">❤</button>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  justify-content: space-around;
  padding-bottom: 8px;
}

button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}
</style>
