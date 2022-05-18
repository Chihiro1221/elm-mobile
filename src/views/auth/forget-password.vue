<script setup lang='ts'>
import Navbar from '@/components/common/navbar.vue'
import { reactive } from 'vue'
import { forgetPassword, IForgetPassword } from '@/apis/authApi'
import authService from '@/composables/auth'
import { Toast } from 'vant'
import router from '@/router'
import authStore from '@/store/auth'

const form = reactive<IForgetPassword>({
  username: '',
  oldpassWord: '',
  newpassword: '',
  confirmpassword: '',
  captcha_code: ''
})
authService.initCaptcha()
const onSubmit = async () => {
  const res = await forgetPassword(form)
  Toast({
    message: res.message ?? res.success,
    icon: res.status ? 'success' : 'fail'
  })
  if (res.status) {
    await authStore().logout()
    await router.push('/login')
  }
}
const confirmPasswordRule = (value: string) => {
  return value === form.newpassword
}
</script>

<template>
  <div class='forget-password-container'>
    <Navbar title='找回密码' />
    <div class='content mt-2'>
      <van-form @submit='onSubmit'>
        <van-field
          v-model='form.username'
          name='账号'
          placeholder='请输入账号'
          :rules='authService.rules.username'
        />
        <van-field
          v-model='form.oldpassWord'
          type='password'
          name='密码'
          placeholder='请输入旧密码'
          :rules='authService.rules.password'
        />
        <van-field
          v-model='form.newpassword'
          type='password'
          name='密码'
          placeholder='请输入新密码'
          :rules='authService.rules.password'
        />
        <van-field
          v-model='form.confirmpassword'
          type='password'
          name='密码'
          placeholder='请重复新密码'
          :rules='[...authService.rules.password,{validator:confirmPasswordRule,message:"两次密码不一致"}]'
        />
        <van-field
          v-model='form.captcha_code'
          center
          clearable
          :rules='authService.rules.code'
          placeholder='请输入验证码'>
          <template #button>
            <img @click='authService.initCaptcha' :src='authService.captcha.value' alt=''>
          </template>
        </van-field>
        <div style='margin: 16px'>
          <van-button block type='primary' color='#2ecc71' native-type='submit'>登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.forget-password-container {
  @apply pt-[46px] bg-[#f5f5f5] h-screen w-full;
  .van-field {
    border: none !important;
  }
}
</style>
