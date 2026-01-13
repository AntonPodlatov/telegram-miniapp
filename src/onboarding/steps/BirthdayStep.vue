<script setup lang="ts">
import { form } from '../stepper.config'
import { watch } from 'vue'

watch(() => form.birthday, (newVal) => {
  if (!newVal) {
    form.age = 0
    return
  }
  const birth = new Date(newVal)
  const diff = Date.now() - birth.getTime()
  form.age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
})
</script>

<template>
  <div>
    <input type="date" v-model="form.birthday" />
    <p>Ваш возраст: {{ form.age }}</p>
  </div>
</template>
