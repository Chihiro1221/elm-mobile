<script setup lang='ts'>

import Navbar from '@/components/common/navbar.vue'
import { Explain } from '@/views/profile/service/index.vue'
import router from '@/router'

const props = defineProps<{
  item: Explain
}>()
if (!props.item) {
  router.push('/service')
}
</script>

<template>
  <div class='service-detail'>
    <Navbar :title='item?.title' />
    <div class='content' v-html='item?.value'></div>
  </div>
</template>

<style scoped lang='scss'>
.service-detail {
  @apply pt-[46px] h-screen w-full bg-white;
  .content {
    @apply p-4 text-sm;
  }
}
</style>
