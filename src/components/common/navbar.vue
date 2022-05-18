<script setup lang='ts'>
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <van-nav-bar fixed @click-left='$router.back()'>
    <template #title>
      <div>{{ title }}</div>
    </template>
    <template #left>
      <div>
        <van-icon name='arrow-left' size='20' />
      </div>
    </template>
  </van-nav-bar>
</template>

<style scoped lang='scss'>

</style>
