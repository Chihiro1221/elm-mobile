<script setup lang='ts'>

</script>

<template>
  <div class='info-container'>
    <van-button @click='$router.back()'>返回</van-button>
  </div>
</template>

<style scoped lang='scss'>
.info-container {
  @apply z-[999999999] w-full h-screen bg-violet-500 absolute top-0 left-0
}
</style>
