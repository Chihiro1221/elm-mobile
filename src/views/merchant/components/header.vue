<script setup lang='ts'>
import { IMerchant } from '@/apis/merchantApi'
import { ref } from 'vue'

const props = defineProps<{
  merchant: IMerchant
}>()

const maskerVisible = ref(false)
</script>

<template>
  <div class='header'>
    <div class='info'>
      <div
        class='masker'
        :style="{ backgroundImage: `url(${'http://elm.cangdu.org/img/' + merchant?.image_path})` }"
      ></div>
      <div class='black-masker'></div>
      <div class='content'>
        <img :src="'http://elm.cangdu.org/img/' + merchant?.image_path" alt='' class='cover' />
        <div class='desc'>
          <h2 class='brank'>{{ merchant?.name }}</h2>
          <div class='delivery'>{{ merchant?.delivery_mode.text }}/38分钟送达</div>
          <div class='activity'>{{ merchant.address }}</div>
        </div>
        <div class='tag' @click='maskerVisible = true'>
          {{ merchant?.supports.length }}个
          <van-icon name='arrow' size='10' />
        </div>
      </div>
    </div>
    <div class='tip' @click='maskerVisible = true'>
      {{ merchant?.promotion_info }}
      <van-icon name='arrow' />
    </div>
  </div>
  <van-overlay :show='maskerVisible' z-index='9999999' class-name='van-overlay'>
    <div id='black-masker'></div>
    <div class='content'>
      <h2 class='name'>{{ merchant.name }}</h2>
      <van-rate
        class='mt-4'
        v-model='merchant.rating'
        :size='25'
        allow-half
        readonly
        color='#ffd21e'
        void-icon='star'
        void-color='#eee'
      />
      <div class='discounts'>
        <van-divider>
          <div class='text-white font-bold'>优惠信息</div>
        </van-divider>
        <div v-for='support of merchant.supports' :data-icon-name='support.icon_name'
             :style='{color:"#" + support.icon_color}' :key='support._id' class='meta'>
          <div>{{ support.description }}</div>
        </div>
      </div>
      <div class='notice'>
        <van-divider>
          <div class='text-white font-bold'>商家公告</div>
        </van-divider>
        <div class='text-xs text-white'>{{ merchant.promotion_info }}</div>
      </div>
    </div>
    <div class='close'>
      <van-icon name='cross' color='white' size='25' @click='maskerVisible = false' />
    </div>
  </van-overlay>
</template>

<style scoped lang='scss'>
.header {
  background: #fff;
  position: relative;
  z-index: 9999;

  .info {
    @apply relative;
    .masker {
      @apply bg-no-repeat bg-center bg-cover absolute w-full h-full z-0;
      filter: blur(8px);
    }

    .black-masker {
      @apply absolute w-full h-full z-[1] opacity-20 bg-black;
      filter: blur(8px);
    }

    .content {
      @apply relative z-50 p-4 flex items-start;
      .cover {
        @apply w-[64px] h-[64px];
      }

      .desc {
        @apply ml-4;
        h2 {
          @apply font-bold text-white flex items-center;
          &.brank {
            &::before {
              content: '品牌';
              @apply bg-[#d5645c] px-1 py-[1] text-xs mr-2 text-white;
            }
          }
        }

        .delivery {
          @apply text-xs text-gray-100 mt-1;
        }

        .activity {
          @apply text-xs text-gray-100 flex items-center mt-1;
          //&::before {
          //  content: '满';
          //  @apply text-[#db362a] bg-white py-[1] px-[2px] scale-75 block;
          //}
        }
      }

      .tag {
        @apply absolute right-4 bottom-2 text-xs bg-[#544d47] opacity-75 rounded-full px-2 py-1 text-white scale-95 flex items-center;
      }
    }
  }

  .tip {
    @apply text-white text-xs truncate p-1 box-border;
    background: rgba($color: black, $alpha: 0.6);

    &::before {
      content: '公告';
      @apply bg-white px-[2px] py-[1px] text-black scale-75 rounded-sm inline-block mr-[1px];
    }
  }
}

.van-overlay {
  backdrop-filter: blur(10px);

  #black-masker {
    @apply absolute w-full h-full z-[1] opacity-10 bg-black;
    pointer-events: none;
    filter: blur(8px);
  }

  .content {
    @apply px-[40px] py-[60px] flex flex-col justify-center items-center flex-1;
    .name {
      @apply text-white font-bold text-center;
    }

    .meta {
      @apply flex items-center text-xs mb-2;
      &::before {
        content: attr(data-icon-name);
        @apply py-[1px] px-[2px] inline-block bg-white scale-90 mr-1 rounded-sm;
      }

      div {
        color: white !important;
      }
    }

    .discounts {
      @apply w-full;
    }

    .notice {
      @apply w-full;
    }


  }

  .close {
    @apply absolute bottom-10 left-1/2 transform translate-x-[-50%] text-white;
  }
}
</style>
