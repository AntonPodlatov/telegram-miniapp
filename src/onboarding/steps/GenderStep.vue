<script setup lang="ts">
import { form } from '../stepper.config'
</script>

<template>
  <div>
    <label>Ваш пол:</label>
    <select v-model="form.gender">
      <option value="">Выберите</option>
      <option value="male">Мужской</option>
      <option value="female">Женский</option>
    </select>

    <label>Кого показывать:</label>
    <select v-model="form.showGender">
      <option value="">Выберите</option>
      <option value="male">Мужчин</option>
      <option value="female">Женщин</option>
      <option value="all">Всех</option>
    </select>
  </div>
</template>
