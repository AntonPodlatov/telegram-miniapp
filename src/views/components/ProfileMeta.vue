<script setup lang="ts">
defineProps<{ profile: any }>()
</script>

<template>
  <div class="meta">
    <div class="name">
      {{ profile.name }}, {{ profile.age }}
      <span v-if="profile.verified">✔</span>
    </div>

    <div class="goal">{{ profile.goal }}</div>
    <div class="bio">{{ profile.bio }}</div>
  </div>
</template>

<style scoped>
.meta {
  margin-bottom: 12px;
}

.name {
  font-size: 20px;
  font-weight: bold;
}

.goal {
  font-size: 14px;
  opacity: 0.9;
}

.bio {
  font-size: 13px;
  opacity: 0.8;
}
</style>
