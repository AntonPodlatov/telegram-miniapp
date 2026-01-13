<script setup lang="ts">
import { ref, computed } from 'vue'
import { onboardingSteps, form } from './stepper.config'
import { useTelegram } from '@/composables/useTelegram'

const tg = useTelegram()
const stepIndex = ref(0)
const step = computed(() => {
  const s = onboardingSteps[stepIndex.value]
  if (!s) throw new Error('Step not found')
  return s
})

const next = () => {
  if (!step.value.validate()) return

  if (stepIndex.value < onboardingSteps.length - 1) {
    stepIndex.value++
  } else {
    localStorage.setItem(`profile_${tg.userId.value}`, JSON.stringify(form))
    window.location.href = '/' // guard обновит state
  }
}
</script>

<template>
  <div class="stepper">
    <h3>{{ step.title }}</h3>
    <component :is="step.component" />
    <button :disabled="!step.validate()" @click="next">
      {{ stepIndex === onboardingSteps.length - 1 ? 'Готово' : 'Далее' }}
    </button>
  </div>
</template>
