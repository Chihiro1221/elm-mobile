import { createRouter, createWebHistory } from 'vue-router'
import Guard from './guard'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/layouts/home.vue') },
    { path: '/location', name: 'location', component: () => import('@/views/location/index.vue') },
    { path: '/city/:id', name: 'city', props: true, component: () => import('@/views/location/city.vue') },
  ],
})

new Guard(router)
export default router
