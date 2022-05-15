<script setup lang="ts">
import { IMerchant } from '@/apis/merchantApi'
const props = defineProps<{
  merchant: IMerchant
}>()
</script>

<template>
  <div class="merchant">
    <img v-lazy="'http://elm.cangdu.org/img/' + merchant.image_path" alt="" />
    <div class="desc">
      <div class="title justify-between">
        <div class="flex merchants-center w-[200px] items-center">
          <div class="brand">品牌</div>
          <h2 class="truncate">{{ merchant.name }}</h2>
        </div>
        <span class="scale-90">保准票</span>
      </div>
      <div class="meta">
        <van-rate
          v-model="merchant.rating"
          :size="6"
          allow-half
          :gutter="4"
          color="#f19f3b"
          void-icon="star"
          void-color="#eee"
        />
        <span class="rate">{{ merchant.rating }}</span>
        <span class="sell">月售{{ merchant.recent_order_num }}单</span>
        <div class="tag">
          <div class="left-tag" :style="{ backgroundColor: '#' + merchant.delivery_mode?.color }">
            {{ merchant.delivery_mode.text }}
          </div>
          <div class="right-tag">准时达</div>
        </div>
      </div>
      <div class="delivery">
        <div class="price">￥20元起送/{{ merchant.piecewise_agent_fee.tips }}</div>
        <div class="time">
          {{ merchant.distance }} /
          <span>{{ merchant.order_lead_time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.merchant {
  @apply flex justify-between border-b p-2 border-[#f7f7f7];
  img {
    @apply w-[70px] h-[70px] mr-2;
  }
  .desc {
    @apply flex-1;
    > div {
      @apply flex items-center;
    }
    .title {
      .brand {
        @apply text-black bg-[#f9da57] h-[16px]  flex items-center text-xs px-[2px] rounded-sm;
      }
      h2 {
        @apply text-black text-[16px] flex-1 ml-2;
      }
      span {
        @apply text-xs text-gray-500;
      }
    }
    .meta {
      .rate {
        @apply text-[#ee7439] text-xs ml-4;
      }
      .sell {
        @apply text-xs text-gray-500 ml-2 flex-1;
      }
      .tag {
        @apply flex flex-row items-center mt-2 scale-75;
        .left-tag {
          @apply text-xs text-white mr-2 px-[2px] py-[1px];
        }
        .right-tag {
          @apply text-xs text-[#4d8ee1] border border-[#4d8ee1] px-[2px] py-[1px];
        }
      }
    }
    .delivery {
      @apply text-xs mt-2  justify-between w-full;
      .price {
        @apply text-gray-500  scale-90;
      }
      .time {
        @apply text-gray-400  scale-90;
        span {
          @apply text-[#4d8ee1];
        }
      }
    }
  }
}
</style>
