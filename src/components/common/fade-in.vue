<script setup lang='ts'>
defineProps<{
  visible: boolean
}>()
</script>

<template>
  <transition
    class='animate__animated'
    appear
    enter-active-class='animate_fade_left'
    leave-active-class='animate_fade_out_left'
    mode='in-out'
  >
    <div v-if='visible' class='fade-in-container'>
      <slot />
    </div>
  </transition>
</template>

<style scoped lang='scss'>
.fade-in-container {
  @apply fixed top-0 left-0 right-0 bottom-0 z-[2004];
}
</style>
