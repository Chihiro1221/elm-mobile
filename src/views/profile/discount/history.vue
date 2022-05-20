<script setup lang='ts'>
import Navbar from '@/components/common/navbar.vue'
import { ref } from 'vue'
import { Envelope, getExpireEnvelope } from '@/apis/envelopeApi'
import authStore from '@/store/auth'
import Item from '@/views/profile/discount/components/item.vue'

const auth = authStore()
const historyEnvelope = ref<Envelope[]>([])
historyEnvelope.value = await getExpireEnvelope(auth.profile?.id!)
</script>

<template>
  <div class='history-container'>
    <Navbar title='历史红包' />
    <div class='container'>
      <Item history v-for='item of historyEnvelope' :key='item.id' :item='item' />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.history-container {
  @apply pt-[46px];
  .container {
    @apply p-4 min-h-screen bg-[#f1f1f1];
  }
}
</style>
