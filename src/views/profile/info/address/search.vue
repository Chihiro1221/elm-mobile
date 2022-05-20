<script setup lang='ts'>
import Navbar from '@/components/common/navbar.vue'
import { ref } from 'vue'
import { searchAddress } from '@/apis/addressApi'
import { IAddress } from '@/apis/cityApi'
import addressService from '@/composables/address'
import router from '@/router'

addressService.clearCurrentAddress()
const search = ref('')
const addresses = ref<IAddress[]>([])
const handleSearch = async () => {
  if (!search.value) return
  addresses.value = await searchAddress(search.value)
}

const handleClick = (item: IAddress) => {
  addressService.setCurrentAddress(item.name)
  router.push('/profile/info/address/add?name=' + item.name)
}
</script>

<template>
  <div class='search-container'>
    <Navbar title='搜索地址' />
    <div class='search '>
      <van-field v-model='search' placeholder='请输入搜索内容' class='rounded !bg-[#f2f2f2] flex-1'>
      </van-field>
      <van-button @click='handleSearch' type='primary' class='!rounded'>确认</van-button>
    </div>
    <div class='tip'>为了满足商家的送餐要求，建议您从列表中选择地址</div>
    <div class='content h-full'>
      <div v-if='addresses.length' class='addresses'>
        <div class='item ' v-for='(item,i) of addresses' :key='i' @click='handleClick(item)'>
          <div>{{ item.name }}</div>
          <div class='text-sm mt-1'>{{ item.address }}</div>
        </div>
      </div>
      <div v-else class='empty'>
        <div>找不到地址？</div>
        <div>请尝试输入小区、写字楼、学校名</div>
        <div>详细地址（如门牌号）可稍后输入</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.search-container {
  @apply h-screen w-full bg-[#f2f2f2] pt-[46px] overflow-hidden;
  .search {
    @apply p-2 bg-white flex items-center gap-2;
  }

  .tip {
    @apply text-sm text-center p-1 bg-[#fdf6e6] text-[#ff883f];
  }

  .content {
    .addresses {
      .item {
        @apply p-2 border-b bg-[#f2f2f2] text-gray-500;
      }
    }

    .empty {
      @apply flex flex-col justify-start translate-y-1/4 items-center gap-2 text-[#969696] h-full;
    }
  }
}
</style>
