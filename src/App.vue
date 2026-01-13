<script setup lang="ts">
import { onMounted } from 'vue'
import { useTelegramOnlyGuard } from '@/composables/guard/useTelegramOnlyGuard'
import Main from '@/views/Main.vue'
import NotTelegram from '@/views/NotTelegram.vue'
import OnboardingStepper from '@/onboarding/OnboardingStepper.vue'

let {check, state} = useTelegramOnlyGuard();

onMounted(() => check());
</script>

<template>
  <NotTelegram v-if="state === 'not-telegram'" />
  <OnboardingStepper v-else-if="state === 'onboarding'" />
  <Main v-else-if="state === 'ready'" />
</template>