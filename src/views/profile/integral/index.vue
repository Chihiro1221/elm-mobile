<script setup lang='ts'>
import { useRoute } from 'vue-router'
import Navbar from '@/components/common/navbar.vue'
import FadeIn from '@/components/common/fade-in.vue'
import { ref, watchEffect } from 'vue'
import Detail from '../integral/detail.vue'
import { handleBind } from '@/hooks/profile'

const route = useRoute()
const show = ref(false)

watchEffect(() => {
  show.value = route.path === '/profile/integral/detail'
})

</script>

<template>
  <div class='balance-container'>
    <Navbar title='我的积分' />
    <div class='card'>
      <div class='content'>
        <div class='title'>
          <div class='text-gray-500'>当前积分</div>
          <div @click="$router.push('integral/detail')" class='flex items-center text-[#5d8cdb]'>
            <van-icon class='mr-1' name='question' color='rgb(77, 142, 225)' />
            积分说明
          </div>
        </div>
        <div class='money mt-2 mb-4'>
          <strong class='text-4xl font-normal'>0</strong>
          <span>分</span>
        </div>
        <van-button block type='default' color='#e74c3c' @click='handleBind("快去下单换取大量积分吧")'>积分兑换商品</van-button>
      </div>
    </div>
    <div class='deal'>
      <div class='title'>最新30天积分记录</div>
      <van-empty image-size='100'>
        <div class='text-center'>
          <div class='text-base mb-2'>最近30天无积分记录</div>
          <div class='text-xs'>快去下单赚取大量积分吧</div>
        </div>
      </van-empty>
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
