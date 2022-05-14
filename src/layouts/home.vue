<script setup lang="ts">
import Navbar from './home/navbar.vue'
import Tabbar from './home/tabbar.vue'
</script>

<template>
  <div class="home">
    <Navbar />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <Tabbar />
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
