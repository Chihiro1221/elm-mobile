<script setup lang='ts'>
import Navbar from './home/navbar.vue'
import Tabbar from './home/tabbar.vue'
</script>

<template>
  <div class='home'>
    <Navbar />
    <router-view v-slot='{ Component,route }'>
      <transition
        appear
        class='animate__animated'
        :enter-active-class="route.meta.animation?.enter ?? 'animate__fadeIn'"
        :leave-active-class="route.meta.animation?.leave ?? 'animate__fadeOut'"
        :duration='150'
        mode='out-in'
      >
        <component :is='Component' />
      </transition>
    </router-view>
    <Tabbar />
  </div>
</template>

<style scoped lang='scss'>
.home {
  padding-top: 46px;
  padding-bottom: 50px;
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
