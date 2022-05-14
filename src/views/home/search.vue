<script setup lang="ts">
import { Toast } from 'vant'
import { ref } from 'vue'
import { IMerchant, searchMerchant } from '@/apis/merchantApi'
import searchStore from '@/store/search'

const search = ref()
const isEmpty = ref(false)
const useSearch = searchStore()
const merchants = ref<IMerchant[]>([])
const submitSearch = async () => {
  if (!search.value) {
    return Toast('请输入内容之后搜索')
  }
  merchants.value = await searchMerchant(search.value)
  if (!merchants.value.length) {
    isEmpty.value = true
    Toast('没有搜索到相关内容')
  }
  const isHas = useSearch.history.includes(search.value)
  if (!isHas) {
    useSearch.history.push(search.value)
    useSearch.initHistroy(useSearch.history)
  }
}
const handleInput = () => {
  if (!search.value) {
    merchants.value = []
  }
  isEmpty.value = false
}

const deleteHistory = (index: number) => {
  useSearch.history.splice(index, 1)
  useSearch.initHistroy(useSearch.history)
}

const clearHistory = () => {
  useSearch.initHistroy([])
}

const selectHistory = (history: string) => {
  search.value = history
  submitSearch()
}
</script>

<template>
  <div class="search">
    <van-field
      autofocus
      v-model="search"
      @input="handleInput"
      @clear="handleInput"
      center
      clearable
      placeholder="请输入商家或者美食名称"
    >
      <template #button>
        <van-button size="small" type="primary" @click="submitSearch">提交搜索</van-button>
      </template>
    </van-field>
    <div class="result" v-if="merchants.length">
      <div class="title">商家</div>
      <div class="content">
        <div class="item" v-for="item of merchants" :key="item.id">
          <img :src="'https://elm.cangdu.org/img/' + item.image_path" alt="" />
          <div class="desc">
            <div class="name">
              {{ item.name }}
              <svg
                data-v-3726cde6=""
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="24"
                height="14"
                class="pay_icon"
              >
                <polygon
                  data-v-3726cde6=""
                  points="0,14 4,0 24,0 20,14"
                  style="fill: none; stroke: rgb(255, 96, 0); stroke-width: 1"
                ></polygon>
                <line
                  data-v-3726cde6=""
                  x1="1.5"
                  y1="12"
                  x2="20"
                  y2="12"
                  style="stroke: rgb(255, 96, 0); stroke-width: 1.5"
                ></line>
                <text data-v-3726cde6="" x="3.5" y="9" style="fill: rgb(255, 96, 0); font-size: 9px; font-weight: bold">
                  支付
                </text>
              </svg>
            </div>
            <div class="sell">月售 {{ item.recent_order_num }} 单</div>
            <div class="delivery">20 元起送/距离{{ item.distance }}公里</div>
          </div>
        </div>
      </div>
    </div>
    <div class="result" v-else-if="!isEmpty && !merchants.length && useSearch.history.length">
      <div class="title">搜索历史</div>
      <div class="history">
        <div class="history-item" v-for="(item, i) of useSearch.history" :key="i" @click="selectHistory(item)">
          <div>{{ item }}</div>
          <van-icon name="close" @click.stop="deleteHistory(i)" />
        </div>
      </div>
      <div class="clear-all" @click="clearHistory">清空搜索历史</div>
    </div>
    <div v-else>
      <van-empty description="暂无内容" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.search {
  .result {
    .title {
      @apply p-2 py-4 bg-[#f5f5f5] text-sm text-gray-500 font-bold;
    }
    .content {
      @apply bg-white;
      .item {
        @apply flex p-4 border-b;
        img {
          @apply w-[40px] h-[40px] mr-2;
        }
        .desc {
          @apply text-xs text-gray-700 flex flex-col gap-1;
          .name {
            @apply flex items-center gap-2;
          }
        }
      }
    }
    .history {
      @apply bg-white;
      &-item {
        @apply p-2 flex justify-between items-center border-b border-b-[#f6f6f6] text-gray-600;
      }
    }
    .clear-all {
      @apply bg-white p-4 text-center font-bold;
      color: $primary-color;
    }
  }
}
</style>
