<script setup lang='ts'>
import Navbar from '@/components/common/navbar.vue'
import { inject, ref } from 'vue'
import { Address, getAddresses, removeAddress } from '@/apis/addressApi'
import authStore from '@/store/auth'
import { Dialog } from 'vant'
import { IInject } from '@/views/home/profile.vue'
import { ProvideKeyEnum } from '@/enum/ProvideKeyEnum'
import AddAddress from '@/views/profile/address/add.vue'
import SearchAddress from '@/views/profile/address/search.vue'
import FadeIn from '@/components/common/fade-in.vue'

const auth = authStore()
const addresses = ref<Address[]>([])
const isEdit = ref(false)
const parent = inject<IInject>(ProvideKeyEnum.PROFILE_KEY)

const fetch = async () => {
  addresses.value = await getAddresses(auth.profile?.id!)
}
fetch()

const handleRemoveAddress = (address: Address) => {
  Dialog.confirm({
    title: '警告',
    message: '确认删除该收货地址吗?',
    overlayStyle: { zIndex: 2100 }
  }).then(async () => {
    await removeAddress(auth.profile?.id!, address.id)
    await fetch()
  })
}
</script>

<template>
  <div class='address-container'>
    <Navbar title='编辑地址' :right='isEdit ? "完成":"编辑"' @right-click='isEdit = !isEdit'
            @left-click='$router.push("/profile/info")' />
    <div class='address mt-2'>
      <div v-for='address of addresses' :key='address.id' class='item bg-white text-xs border-y px-4 py-2 relative'>
        <div class='content text-sm'>{{ address.address }}</div>
        <div class='mobile text-gray-500 mt-1'>{{ address.name }} {{ address.phone }}</div>
        <transition
          appear
          class='animate__animated'
          enter-active-class='animate__fadeIn'
          leave-active-class='animate__fadeOut'
          :duration='150'
        >
          <van-icon v-if='isEdit' size='20' name='close' class='!absolute right-4 top-1/2 -translate-y-1/2'
                    @click='handleRemoveAddress(address)' />
        </transition>
      </div>
      <div v-for='address of addresses' :key='address.id' class='item bg-white text-xs border-y px-4 py-2 relative'>
        <div class='content text-sm'>{{ address.address }}</div>
        <div class='mobile text-gray-500 mt-1'>{{ address.name }} {{ address.phone }}</div>
        <transition
          appear
          class='animate__animated'
          enter-active-class='animate__fadeIn'
          leave-active-class='animate__fadeOut'
          :duration='150'
        >
          <van-icon v-if='isEdit' size='20' name='close' class='!absolute right-4 top-1/2 -translate-y-1/2'
                    @click='handleRemoveAddress(address)' />
        </transition>
      </div>
    </div>
    <van-cell @click='$router.push("/profile/info/address/add")' class='mt-2 border-y mb-4' title='添加地址' is-link />
    <fade-in :visible='parent.addAddressShow.value'>
      <AddAddress />
    </fade-in>
    <fade-in :visible='parent.searchAddressShow.value'>
      <SearchAddress />
    </fade-in>
  </div>
</template>

<style scoped lang='scss'>
.address-container {
  @apply absolute w-full bg-[#f2f2f2] pt-[46px];
  z-index: 2001;

  .van-nav-bar {
    position: fixed;
  }
}


</style>
