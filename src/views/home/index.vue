<script setup lang='ts'>
import { getMerchants, IMerchant } from '@/apis/merchantApi'
import { ref } from 'vue'
import MerchantItem from '@/components/merchant/item.vue'
import Swiper from '@/layouts/home/swiper.vue'

const merchants = ref<IMerchant[]>()
merchants.value = await getMerchants()
</script>

<template>
  <div class='main'>
    <Swiper />
    <div class='merchant'>
      <div class='title'>
        <van-icon name='shop-o' size='15' />
        附近商家
      </div>
      <div class='content'>
        <MerchantItem
          v-for='item of merchants'
          :key='item.id'
          :merchant='item'
          @click='$router.push(`/merchant/${item.id}`)'
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>

.my-swipe {
  background-color: white;
  box-shadow: 0px 0px 30px rgba($color: #000000, $alpha: 0.1);
  padding-bottom: 20px;
}

.merchant {
  background-color: white;
  margin-top: 12px;

  > .title {
    @apply text-xs text-gray-500 p-2;
  }

  .content {
  }
}
</style>
