<script setup lang='ts'>
import Navbar from '@/components/common/navbar.vue'
import authStore from '@/store/auth'
import { reactive, ref } from 'vue'
import { FieldRule, FormInstance, Toast } from 'vant'
import { ExchangeForm, exchangeMember } from '@/apis/memberApi'

const auth = authStore()

const form = reactive<ExchangeForm>({
  number: '',
  password: ''
})
const formRef = ref<FormInstance>()
const isDisabled = ref(true)
const rules = reactive<Record<string, FieldRule[]>>({
  number: [
    { required: true, message: '请输入卡号' },
    { pattern: /^\d{10}$/, message: '请输入10位数字' }
  ],
  password: [
    { required: true, message: '请输入卡码' },
    { pattern: /^\d{6}$/, message: '请输入6位数字' }
  ]
})
const validate = () => {
  formRef.value?.validate().then(() => {
    isDisabled.value = false
  }).catch(() => {
    isDisabled.value = true
  })
}
const onSubmit = async () => {
  const res = await exchangeMember(auth.profile?.id!, form)
  Toast({
    message: res.message,
    icon: 'fail',
    duration: 1000
  })
}
</script>

<template>
  <div class='exchange-container'>
    <navbar title='兑换会员' />
    <div class='tip'>成功兑换后将关联到当前账户：<span class='font-bold text-black'>{{ auth.profile?.username }}</span></div>
    <van-form @submit='onSubmit' ref='formRef'>
      <van-field placeholder='请输入10位卡号' v-model='form.number' maxlength='10' :rules='rules.number' @input='validate' />
      <van-field placeholder='请输入6位卡密' v-model='form.password' maxlength='6' :rules='rules.password'
                 @input='validate' />
      <div class='p-4'>
        <van-button :disabled='isDisabled' type='primary' block native-type='submit' class='rounded'>兑换</van-button>
      </div>
    </van-form>
    <div class='footer'>
      <h2>——温馨提示——</h2>
      <p>新兑换的会员服务，权益以「会员说明」为准。</p>
      <p>月卡：30次减免配送费</p>
      <p>季卡：60次减免配送费</p>
      <p>年卡：360次减免配送费</p>
      <p>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.exchange-container {
  @apply pt-[46px] bg-[#f5f5f5] h-screen;
  .tip {
    @apply text-sm bg-[#f5f5f5] p-4 text-[#666];
  }

  .footer {
    @apply text-[#aaa] text-xs px-10;
    h2 {
      @apply text-center text-sm mt-2 mb-4;
    }

    p {
      @apply mt-1;
    }
  }
}
</style>
