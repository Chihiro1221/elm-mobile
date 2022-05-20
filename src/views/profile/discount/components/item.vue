<script setup lang='ts'>
import { Envelope } from '@/apis/envelopeApi'

const props = defineProps<{
  item: Envelope
  history?: boolean
}>()
</script>

<template>
  <div class='item' :class='{"history":history}'>
    <div class='item-container'>
      <div class='price'>
        <div class='title'>
          ￥
          <span>{{ item.amount.toFixed(1) }}</span>
        </div>
        <div>{{ item.description_map.sum_condition }}</div>
      </div>
      <div class='tip'>
        <h2>{{ item.name }}</h2>
        <div>{{ item.description_map.validity_periods }}</div>
        <div>{{ item.description_map.phone }}</div>
      </div>
      <div class='expire'>{{ item.description_map.validity_delta }}</div>
      <img src='/images/expire.png' alt='' width='70' height='70' class='expire-img'>
    </div>
    <div class='desc' v-if='item.limit_map'>{{ item.limit_map.restaurant_flavor_ids }}</div>
  </div>
</template>

<style scoped lang='scss'>
.item {
  @apply rounded mt-2 overflow-hidden;
  &.history {
    .item-container {
      background: white url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAAAXNSR0IArs4c6QAAAHtJREFUKBVjvHv37n8GKgImKpoFNmoYGcjIyAgK6+VA2o6FhUWInZ1dlomJKQDIP40cbIzERApQ01+g5jAFBYV1yJpB7P///zPev39/IpDOBfGJDcNGbIaBDAC5XFFRsQBIHwDxCRoIVPidmZl5CkgxLgBU8w/owl6QPABvmyDiDQUF7gAAAABJRU5ErkJggg==') repeat-x;
      background-size: 12px;
      position: relative;

      .price {
        .title {
          @apply text-[#999]
        }
      }

      .expire {
        @apply hidden
      }

      .expire-img {
        @apply block;
      }
    }
  }

  .item-container {
    @apply px-2 py-6 flex items-start;
    background: white url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAIBAMAAAALs8LeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAeUExURUxpcf9TQf9aS/9TQP9TQP9TQv9TQf9UQP9bSP9TQCdGiZQAAAAJdFJOUwBPEZzKPX2/HKJFz58AAAAkSURBVAjXY5gJBwzEMScHNXpCmQIMDMwQ5jQGIKgEMyeBmJIAtqcnWdDMwKsAAAAASUVORK5CYII=') repeat-x;
    background-size: 12px;

    .price {
      @apply min-w-[90px] px-4 border-r border-r-[#eee];

      .title {
        @apply text-[#ff5340] font-bold;

        span {
          @apply text-3xl;
        }
      }

      .title + div {
        @apply text-xs text-gray-500;
      }
    }

    .tip {
      @apply text-xs ml-4 flex-1;

      h2 {
        @apply text-gray-500 text-base;
      }

      div {
        @apply text-gray-500;
      }
    }

    .expire {
      @apply text-red-500;
    }

    .expire-img {
      @apply hidden opacity-20 absolute right-2 top-5;
    }
  }

  .desc {
    @apply p-4 bg-[#f9f9f9] text-xs text-[#999];
  }
}
</style>
