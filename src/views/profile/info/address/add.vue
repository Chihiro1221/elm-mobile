<script setup lang='ts'>
import Navbar from '@/components/common/navbar.vue'
import { reactive, watchEffect } from 'vue'
import { addAddress, IAddressForm } from '@/apis/addressApi'
import { useRoute } from 'vue-router'
import authStore from '@/store/auth'
import router from '@/router'

const route = useRoute()
const form = reactive<IAddressForm>({
  name: '',
  address: '',
  address_detail: '',
  phone: '',
  phone_bk: ''
})
watchEffect(() => {
  if (route.path !== '/profile/info/address/add') return
  if (route.query?.name) {
    form.address = (route.query.name as string)
  } else {
    let key: keyof typeof form
    for (key in form) {
      if (Object.hasOwn(form, key)) {
        form[key] = ''
      }
    }
  }

})
const onSubmit = async () => {
  await addAddress(authStore().profile?.id!, form)
  await router.push('/profile/info/address')
}

const leftClick = () => {
  router.push('/profile/info/address')
}
</script>
<script lang='ts'>
export default {
  name: 'AddAddress'
}
</script>

<template>
  <div>
    <div class='add-address-container'>
      <Navbar title='添加地址' :onLeftClick='leftClick' />
      <div class='content p-2'>
        <van-form @submit='onSubmit'>
          <van-field
            v-model='form.name'
            name='姓名'
            placeholder='请输入姓名'
            :rules="[{ required: true, message: '请输入姓名' }]"
          />
          <van-field
            @click='$router.push("/profile/info/address/search")'
            readonly
            v-model='form.address'
            name='地址'
            placeholder='请输入地址'
            :rules="[{ required: true, message: '请输入地址' }]"
          />
          <van-field
            v-model='form.address_detail'
            name='详细地址'
            placeholder='请输入详细送餐地址'
            :rules="[{ required: true, message: '请输入详细送餐地址' }]"
          />
          <van-field
            v-model='form.phone'
            name='联系方式'
            placeholder='请输入联系方式'
            :rules="[{ required: true, message: '请输入联系方式' }]"
          />
          <van-field
            v-model='form.phone_bk'
            name='备用联系方式'
            placeholder='备用联系方式（选填）'
          />
          <div class='mt-4'>
            <van-button block type='primary' native-type='submit' color='#2ecc71'>
              新增地址
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.add-address-container {
  @apply w-full bg-[#f2f2f2] pt-[46px] h-screen;
  position: absolute;

  &.close {
    @apply hidden;
  }

  .van-nav-bar {
    position: fixed;
  }

  .content {
    .van-cell {
      @apply mb-2;
    }
  }
}
</style>
