<script setup lang="ts">
import { form } from '../stepper.config'
</script>

<template>
  <input v-model="form.name" placeholder="Имя" />
</template>