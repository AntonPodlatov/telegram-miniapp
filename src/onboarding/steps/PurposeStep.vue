<script setup lang="ts">
import { form } from '../stepper.config'
</script>

<template>
  <div>
    <label>Для чего вы здесь?</label>
    <select v-model="form.purpose">
      <option value="">Выберите</option>
      <option value="dating">Свидания</option>
      <option value="relationships">Отношения</option>
      <option value="friendship">Дружба</option>
      <option value="chat">Общение</option>
    </select>
  </div>
</template>
