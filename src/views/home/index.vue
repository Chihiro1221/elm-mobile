<script setup lang="ts">
import { getGoodCate, ICate } from '@/apis/cateApi'
import { getMerchants, IMerchant } from '@/apis/merchantApi'
import { ref } from 'vue'
const categories = ref<ICate[][]>([])
const merchants = ref<IMerchant[]>()
merchants.value = await getMerchants()

const fetch = async () => {
  const res = await getGoodCate()
  const arr: ICate[][] = []
  // 将数组拆成二维数组
  for (let i = 0; i < res.length; i++) {
    if (i === 0) {
      arr[arr.length] = []
    }
    if (i !== 0 && i % 8 === 0) {
      arr[arr.length] = []
    }
    arr[arr.length - 1].push(res[i])
  }
  categories.value = arr
}
fetch()
</script>

<template>
  <van-swipe class="my-swipe" indicator-color="#3478f6">
    <van-swipe-item v-for="(item, i) of categories" :key="i" class="flex flex-wrap">
      <div class="flex p-4 items-center justify-center flex-col w-1/4" v-for="cate of item" :key="cate.id">
        <img class="mb-2 w-[40px] h-[40px]" :src="'https://fuss10.elemecdn.com/' + cate.image_url" alt="" />
        <div class="text-xs text-gray-500">{{ cate.title }}</div>
      </div>
    </van-swipe-item>
  </van-swipe>

  <div class="merchant">
    <div class="title">附近商家</div>
    <div class="content">
      <div class="item" v-for="item of merchants" :key="item.id">
        <img :src="'http://elm.cangdu.org/img/' + item.image_path" alt="" />
        <div class="desc">
          <div class="title justify-between">
            <div class="flex items-center w-[200px]">
              <div class="brand">品牌</div>
              <h2 class="truncate">{{ item.name }}</h2>
            </div>
            <span class="scale-90">保准票</span>
          </div>
          <div class="meta">
            <van-rate
              v-model="item.rating"
              :size="6"
              allow-half
              :gutter="4"
              color="#f19f3b"
              void-icon="star"
              void-color="#eee"
            />
            <span class="rate">{{ item.rating }}</span>
            <span class="sell">月售{{ item.recent_order_num }}单</span>
            <div class="tag">
              <div class="left-tag" :style="{ backgroundColor: '#' + item.delivery_mode.color }">
                {{ item.delivery_mode.text }}
              </div>
              <div class="right-tag">准时达</div>
            </div>
          </div>
          <div class="delivery">
            <div class="price">￥20元起送/{{ item.piecewise_agent_fee.tips }}</div>
            <div class="time">
              {{ item.distance }} /
              <span>{{ item.order_lead_time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
    .item {
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
            @apply text-black bg-[#f9da57] py-[1px] text-xs px-[2px] rounded-sm;
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
  }
}
</style>
