<script setup lang="ts">
const modelValue = defineModel<'feed' | 'likes' | 'filters' | 'profile'>()
</script>

<template>
  <nav class="bottom-nav">
    <button @click="modelValue = 'likes'" :class="{active:modelValue==='likes'}">❤️</button>
    <button @click="modelValue = 'feed'" :class="{active:modelValue==='feed'}">🔥</button>
    <button @click="modelValue = 'filters'" :class="{active:modelValue==='filters'}">🎯</button>
    <button @click="modelValue = 'profile'" :class="{active:modelValue==='profile'}">👤</button>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  left: 0;
  bottom: 0;

  width: 100vw;
  height: calc(var(--bottom-nav-height) + var(--safe-bottom));

  display: flex;
  justify-content: space-around;
  align-items: center;

  padding-bottom: var(--safe-bottom);

  background: var(--tg-bg-color, #fff);
  border-top: 1px solid #eee;

  z-index: 100;
}

button {
  background: none;
  border: none;
  font-size: 20px;
  opacity: 0.5;
}

button.active {
  opacity: 1;
}
</style>
