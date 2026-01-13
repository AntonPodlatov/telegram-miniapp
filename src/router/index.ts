import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

router.beforeEach((to, from, next) => {
  console.log(`Навигация: ${from.path} -> ${to.path}`)
  next()
})

export default router