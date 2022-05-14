<script setup lang="ts">
import router from '@/router'
const navbar = router.getRoutes().filter(route => route.meta.tabbar)
</script>

<template>
  <van-tabbar route border>
    <van-tabbar-item v-for="(nav, i) of navbar" :key="i" :to="nav.path" :icon="nav.meta.tabbar?.icon">
      {{ nav.meta.tabbar?.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped lang="scss"></style>
