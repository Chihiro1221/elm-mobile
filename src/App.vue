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
      >
        <keep-alive :include='["AddAddress"]'>
          <component :is='Component' />
        </keep-alive>
      </transition>
    </router-view>
  </suspense>
</template>

<style lang='scss' scoped>
.animate__fadeInRight, animate__fadeOutRight {
  animation-duration: 300ms;
}

.animate__fadeIn, .animate__fadeOut {
  animation-duration: 200ms;
}
</style>
