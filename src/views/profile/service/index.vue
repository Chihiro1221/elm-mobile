<script setup lang='ts'>

import Navbar from '@/components/common/navbar.vue'
import { computed, ref, watchEffect } from 'vue'
import { getServiceExplains } from '@/apis/serviceApi'
import _ from 'lodash'
import { navigate } from '@/utils/navigate'
import FadeIn from '@/components/common/fade-in.vue'
import Detail from '@/views/profile/service/detail.vue'
import { useRoute } from 'vue-router'
import router from '@/router'

export interface Explain {
  title?: string
  value?: string
}

const explains = ref<Record<string, string>>()
const route = useRoute()
const detailVisible = ref(false)
const map = new Map<string, Explain>()
const currentExplain = ref<Explain>()
explains.value = await getServiceExplains()

watchEffect(() => {
  detailVisible.value = route.path === '/service/detail'
})
Object.entries(explains.value).forEach(([key, value]) => {
  const keys = handleKey(_.kebabCase(key).split('-'))
  map.has(keys) ? map.set(keys, { ...map.get(keys), title: value }) : map.set(keys, { value })
})
const services = computed(() => {
  return Array.from(map.values()).filter(item => item.title)
})

function handleKey(arr: string[]) {
  arr.length > 1 ? arr.pop() : arr
  return arr.reduce((p, c) => p + '-' + c)
}


const handleClick = (item: Explain) => {
  currentExplain.value = item
  router.push('/service/detail')
}

</script>

<template>
  <div class='service-container'>
    <Navbar title='服务中心' @left-click='$router.push("/profile")' />
    <div class='service-connect'>
      <div class='item' @click='navigate("https://ecs-im.ele.me/")'>
        <van-icon name='friends' color='#ee825d' size='25' />
        <div>在线客服</div>
      </div>
      <div class='item' @click='navigate("tel:4001-80-80")'>
        <van-icon name='phone' color='#80c03c' size='25' />
        <div>在线客服</div>
      </div>
    </div>
    <div class='problem'>
      <div class='title'>热门问题</div>
      <van-cell :title='item.title' is-link v-for='(item,i) of services' :key='i' @click='handleClick(item)' />
    </div>
    <fade-in :visible='detailVisible'>
      <Detail :item='currentExplain' />
    </fade-in>
  </div>
</template>

<style scoped lang='scss'>
.service-container {
  @apply pt-[46px];
  .service-connect {
    @apply flex items-center border-b border-b-[#eee];
    .item {
      @apply w-1/2 flex flex-col justify-center items-center p-6 text-sm text-gray-500;
      > div {
        @apply mt-1;
      }

      &:first-child {
        @apply border-r border-r-[#eee];
      }
    }
  }

  .problem {
    .title {
      @apply p-4 border-b border-b-[#eee] text-gray-600;
    }

    .van-cell {
      @apply border-b border-b-[#eee] text-gray-500;
    }
  }
}
</style>
