<script setup lang='ts'>
import { useRoute } from 'vue-router'
import Navbar from '@/components/common/navbar.vue'
import FadeIn from '@/components/common/fade-in.vue'
import { ref, watchEffect } from 'vue'
import Detail from '@/views/profile/balance/detail.vue'

const route = useRoute()
const show = ref(false)

watchEffect(() => {
  show.value = route.path === '/profile/balance/detail'
})
</script>

<template>
  <div class='balance-container'>
    <Navbar title='我的余额' />
    <div class='card'>
      <div class='content'>
        <div class='title'>
          <div class='text-gray-500'>当前余额</div>
          <div @click="$router.push('balance/detail')" class='flex items-center text-[#5d8cdb]'>
            <van-icon class='mr-1' name='question' color='rgb(77, 142, 225)' />
            余额说明
          </div>
        </div>
        <div class='money mt-2 mb-4'>
          <strong class='text-4xl font-normal'>0.00</strong>
          <span>元</span>
        </div>
        <van-button disabled block type='default' color='#999'>提现</van-button>
      </div>
    </div>
    <div class='deal'>
      <div class='title'>交易明细</div>
      <van-empty image-size='100' description='暂无明细记录' />
    </div>
    <FadeIn :visible='show'>
      <Detail />
    </FadeIn>
  </div>
</template>

<style scoped lang='scss'>
.balance-container {
  @apply pt-[46px] h-screen bg-[#f5f5f5];
  .card {
    @apply p-2 rounded-sm;
    background-color: $primary-color;

    .content {
      @apply rounded-sm bg-white p-2;
      .title {
        @apply text-sm flex items-center justify-between;
      }
    }
  }

  .deal {
    @apply text-sm text-gray-500 p-3;
  }
}
</style>
