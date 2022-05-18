<script setup lang='ts'>
const props = withDefaults(defineProps<{ title?: string, right?: string }>(), {
  title: '默认标题'
})
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
    <template #right>
      <div @click='$emit("right-click")' class='text-white'>{{ right }}</div>
    </template>
  </van-nav-bar>
</template>

<style scoped lang='scss'>

</style>
