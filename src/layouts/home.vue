<script setup lang="ts">
import router from '@/router'
import locationStore from '@/store/loaction'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const { location } = locationStore()
const route = useRoute()
const title = ref()
const navbar = router.getRoutes().filter(route => route.meta.tabbar)
watch(
  () => route.path,
  () => {
    if (route.path === '/home') {
      title.value = location?.name
      return
    }
    if (route.meta.tabbar?.name) {
      title.value = route.meta.tabbar.name
    }
  },
  { immediate: true }
)
const rihgtText = computed(() => {
  return route.path === '/home' ? '登录|注册' : ''
})
const leftText = computed(() => {
  return route.path === '/home' ? 'search' : 'arrow-left'
})
const leftCilck = () => {
  route.path === '/home' ? router.push('/search') : router.back()
}
const titleClick = () => {
  route.path === '/home' ? router.push('/location') : null
}
</script>

<template>
  <div class="home">
    <van-nav-bar fixed @click-left="leftCilck">
      <template #title>
        <div @click="titleClick">{{ title }}</div>
      </template>
      <template #left>
        <div><van-icon :name="leftText" size="20" /></div>
      </template>
      <template #right>
        <div class="text-white">{{ rihgtText }}</div>
      </template>
    </van-nav-bar>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <van-tabbar route border>
      <van-tabbar-item v-for="(nav, i) of navbar" :key="i" :to="nav.path" :icon="nav.meta.tabbar?.icon">
        {{ nav.meta.tabbar?.name }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="scss">
.home {
  padding-top: 47px;
  padding-bottom: 50px;
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
