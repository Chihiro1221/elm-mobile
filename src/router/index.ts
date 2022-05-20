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
          meta: { tabbar: { name: '首页', icon: 'wap-home-o', index: 1 } },
          component: () => import('@/views/home/index.vue')
        },
        {
          path: 'search',
          name: 'home.search',
          meta: { tabbar: { name: '搜索', icon: 'search', index: 2 } },
          component: () => import('@/views/home/search.vue')
        },
        {
          path: 'order',
          name: 'home.order',
          meta: { tabbar: { name: '订单', icon: 'orders-o', index: 3 } },
          component: () => import('@/views/home/order.vue')
        },
        {
          path: 'profile/:page1?/:page2?/:page3?',
          name: 'home.profile',
          meta: { tabbar: { name: '我的', icon: 'user-o', index: 4 } },
          component: () => import('@/views/profile/index.vue')
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
      path: '/member/:page?',
      name: 'member',
      component: () => import('@/views/profile/member/index.vue')
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('@/views/profile/service/index.vue')
    },
    {
      path: '/download',
      name: 'download',
      component: () => import('@/views/profile/download.vue')
    },
    {
      path: '/profile/balance',
      name: 'profile.balance',
      component: () => import('@/views/profile/balance/index.vue')
    },
    {
      path: '/profile/balance/:page?',
      name: 'profile.balance.detail',
      component: () => import('@/views/profile/balance/index.vue')
    },
    {
      path: '/profile/discount/:page?',
      name: 'profile.discount',
      component: () => import('@/views/profile/discount/index.vue')
    },
    {
      path: '/profile/integral/:page?',
      name: 'profile.integral',
      component: () => import('@/views/profile/integral/index.vue')
    },
    {
      path: '/order/confirm',
      name: 'order.confirm',
      component: () => import('@/views/pay/index.vue')
    }
  ]
})

export async function setupRouter(app: App) {
  void (await authStore().initUserProfile())
  new Guard(router)
  app.use(router)
}

export default router
