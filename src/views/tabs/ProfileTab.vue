<script setup lang="ts">
import { useBackendUser } from '@/composables/useBackendUser'

const { user } = useBackendUser()
</script>

<template>
  <div class="center">
    <h2>👤 Профиль</h2>
    <p>Имя: {{ user?.name }}</p>
    <p>Возраст: {{ user?.age }}</p>
  </div>
</template>
