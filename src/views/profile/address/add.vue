<script setup lang='ts'>
import Navbar from '@/components/common/navbar.vue'
import { reactive } from 'vue'
import { IAddressForm } from '@/apis/addressApi'

const onSubmit = () => {
  console.log('onSubmit')
}

const form = reactive<IAddressForm>({
  name: '',
  address: '',
  address_detail: '',
  phone: '',
  phone_bk: ''
})
</script>

<template>
  <div class='add-address-container'>
    <Navbar title='添加地址' />
    <div class='content p-2'>
      <van-form @submit='onSubmit'>
        <van-field
          v-model='form.name'
          name='姓名'
          placeholder='请输入姓名'
          :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <van-field
          v-model='form.address'
          name='地址'
          placeholder='请输入地址'
          readonly
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
          v-model='form.phone'
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
</template>

<style scoped lang='scss'>
.add-address-container {
  @apply absolute w-full bg-[#f2f2f2] pt-[46px] h-screen;
  z-index: 2002;

  .van-nav-bar {
    position: absolute;
  }

  .content {
    .van-cell {
      @apply mb-2;
    }
  }
}

</style>
