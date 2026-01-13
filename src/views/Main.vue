<script setup lang="ts">
import { ref } from 'vue'
import BottomNav from './BottomNav.vue'
import SwipeTab from './tabs/SwipeTab.vue'
import LikesTab from './tabs/LikesTab.vue'
import FiltersTab from './tabs/FiltersTab.vue'
import ProfileTab from './tabs/ProfileTab.vue'

type Tab = 'feed' | 'likes' | 'filters' | 'profile'
const activeTab = ref<Tab>('feed')
</script>

<template>
  <div class="layout">
    <div class="content">
      <SwipeTab v-if="activeTab === 'feed'" />
      <LikesTab v-else-if="activeTab === 'likes'" />
      <FiltersTab v-else-if="activeTab === 'filters'" />
      <ProfileTab v-else />
    </div>

    <BottomNav v-model="activeTab" />
  </div>
</template>

<style scoped>
.layout {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* ОСНОВНОЙ КОНТЕЙНЕР */
.content {
  position: absolute;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  padding-left: var(--screen-padding);
  padding-right: var(--screen-padding);

  padding-top: calc(
      var(--bottom-nav-height) + var(--screen-padding)
  );

  padding-bottom: calc(
      var(--bottom-nav-height) + var(--screen-padding) + var(--safe-bottom)
  );
}
</style>
