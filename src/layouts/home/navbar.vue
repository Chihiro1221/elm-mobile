<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import locationStore from '@/store/loaction'
import { useRoute } from 'vue-router'
import router from '@/router'

const title = ref()
const { location } = locationStore()
const route = useRoute()
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
</template>

<style scoped lang="scss"></style>
