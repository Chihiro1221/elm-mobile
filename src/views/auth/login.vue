<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ILogin, login, UserProfile } from '@/apis/authApi'
import { Toast } from 'vant'
import store from '@/utils/store'
import { AuthEnum } from '@/enum/AuthEnum'
import Navbar from '@/components/common/navbar.vue'
import authService from '@/composables/auth'
import router from '@/router'
import authStore from '@/store/auth'

const auth = authStore()
const form = reactive<ILogin>({
  username: 'heart',
  password: 'youzhi..',
  captcha_code: '',
})
const showPassword = ref(false)
authService.initCaptcha()
const onSubmit = async () => {
  const res = await login(form)
  if ('status' in res && !res.status) {
    await authService.initCaptcha()
    return Toast({
      message: res.message,
      icon: 'fail',
    })
  }
  store.set(AuthEnum.USER_ID, (res as UserProfile).id)
  await auth.initUserProfile()
  await router.push('/home')
}
</script>

<template>
  <div class="login">
    <Navbar title="账号登录" />
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          v-model="form.username"
          name="账号"
          label="账号"
          placeholder="请输入账号"
          :rules="authService.rules.username"
        />
        <van-field
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="authService.rules.password"
        >
          <template #button>
            <van-icon :name="showPassword ? 'closed-eye' : 'eye-o'" @click="showPassword = !showPassword" />
          </template>
        </van-field>
        <van-field
          v-model="form.captcha_code"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
          :rules="authService.rules.code"
        >
          placeholder='请输入验证码'>
          <template #button>
            <img @click="authService.initCaptcha" :src="authService.captcha.value" alt="" />
          </template>
        </van-field>
        <div class="tip px-4 py-2 text-xs text-red-500">
          <div class="mb-2">温馨提示：未注册过的账号，登录时将自动注册</div>
          <div>注册过的用户可凭账号密码登录</div>
        </div>
        <div style="margin: 16px">
          <van-button block type="primary" color="#2ecc71" native-type="submit">登录</van-button>
        </div>
      </van-form>
      <div class="px-4 text-right text-[#3b95e9] text-sm">
        <router-link to="/forget-password" @click="$router.push('/forget-password')">重置密码?</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  @apply pt-[46px] bg-[#f5f5f5] h-screen;
  .van-field {
    border: none !important;
  }
}
</style>
