<script setup lang='ts'>
</script>

<template>
  <suspense>
    <router-view v-slot='{ Component, route }'>
      <transition
        appear
        class='animate__animated'
        :enter-active-class="route.meta.animation?.enter ?? 'animate__fadeIn'"
        :leave-active-class="route.meta.animation?.leave ?? 'animate__fadeOut'"
        :mode='$route.path === "/profile/info" ? "in-out" : "out-in"'
      >
        <component :is='Component' />
      </transition>
    </router-view>
  </suspense>
</template>

<style lang='scss' scoped>
.animate__fadeInRight {
  animation-duration: 300ms;
}

.animate__fadeIn, .animate__fadeOut {
  animation-duration: 200ms;
}
</style>
