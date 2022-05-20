<script setup lang='ts'>

import Navbar from '@/components/common/navbar.vue'
</script>

<template>
  <div class='record-container'>
    <Navbar title='购买记录' />
    <div>
      <van-empty description='没有购买记录'></van-empty>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.record-container {
  @apply pt-[46px] h-screen bg-[#fff];

}
</style>
