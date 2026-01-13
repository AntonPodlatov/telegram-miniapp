<script setup lang="ts">
import { form } from '../stepper.config'

const handleFile = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    form.photo = reader.result as string
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div>
    <input type="file" @change="handleFile" accept="image/*" />
    <div v-if="form.photo">
      <img :src="form.photo" alt="Фото" style="max-width:200px" />
    </div>
  </div>
</template>
