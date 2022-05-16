<script setup lang='ts'>
const props = defineProps<{
  id: string
}>()
</script>

<template>
  <div class='bg-violet-500 h-screen w-screen absolute top-0 left-0 z-[9999999]'>
    <van-button @click='$router.back()'>返回</van-button>
    {{ id }}
  </div>
</template>

<style scoped lang='scss'>

</style>
