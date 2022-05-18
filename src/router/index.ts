import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Guard from './guard'
import authStore from '@/store/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      component: () => import('@/layouts/home.vue'),
      children: [
        {
          path: 'home',
          name: 'home.index',
          meta: { tabbar: { name: '首页', icon: 'wap-home-o' } },
          component: () => import('@/views/home/index.vue')
        },
        {
          path: 'search',
          name: 'home.search',
          meta: { tabbar: { name: '搜索', icon: 'search' } },
          component: () => import('@/views/home/search.vue')
        },
        {
          path: 'order',
          name: 'home.order',
          meta: { tabbar: { name: '订单', icon: 'orders-o' } },
          component: () => import('@/views/home/order.vue')
        },
        {
          path: 'profile',
          name: 'home.profile',
          meta: { tabbar: { name: '我的', icon: 'user-o' } },
          component: () => import('@/views/home/profile.vue')
        }
      ]
    },
    { path: '/location', name: 'location', component: () => import('@/views/location/index.vue') },
    { path: '/city/:id', name: 'city', props: true, component: () => import('@/views/location/city.vue') },
    { path: '/category', name: 'category', component: () => import('@/views/category/index.vue') },
    {
      path: '/merchant/:id',
      name: 'merchant',
      props: true,
      component: () => import('@/views/merchant/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { guest: true },
      component: () => import('@/views/auth/login.vue')
    },
    {
      path: '/forget-password',
      name: 'forget.password',
      component: () => import('@/views/auth/forget-password.vue')
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('@/views/auth/member.vue')
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('@/views/auth/service.vue')
    },
    {
      path: '/download',
      name: 'download',
      component: () => import('@/views/auth/download.vue')
    },
    {
      path: '/profile/info',
      name: 'profile.info',
      meta: { animation: { enter: 'animate__fadeInRight', leave: 'animate__fadeOutRight' } },
      component: () => import('@/views/auth/info.vue')
    }
  ]
})

export async function setupRouter(app: App) {
  void await authStore().initUserProfile()
  new Guard(router)
  app.use(router)
}

export default router
