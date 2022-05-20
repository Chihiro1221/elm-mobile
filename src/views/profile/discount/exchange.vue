<script setup lang="ts">
import Navbar from '@/components/common/navbar.vue'
import { reactive, ref } from 'vue'
import captchaService from '@/composables/auth'
import { FieldRule, FormInstance, Toast } from 'vant'
import { exchangeEnvelope, EnvelpoeForm } from '@/apis/envelopeApi'
import authStore from '@/store/auth'

const auth = authStore()
const form = reactive<EnvelpoeForm>({
  exchange_code: '',
  captcha_code: '',
})
const rules = reactive<Record<string, FieldRule[]>>({
  exchange_code: [{ required: true, message: '请输入兑换码' }],
  captcha_code: [
    { required: true, message: '请输入验证码' },
    { pattern: /^\d{4}$/, message: '验证码必须是4位数字' },
  ],
})
const formRef = ref<FormInstance>()
const isDisabled = ref(true)
captchaService.initCaptcha()

const onSubmit = async () => {
  const res = await exchangeEnvelope(auth.profile?.id!, form)
  if (!res.status) {
    return Toast({
      message: res.message,
      icon: 'fail',
    })
  } else {
    Toast({
      message: res.message,
      icon: 'success',
    })
    await auth.initUserProfile()
  }
}

const validate = () => {
  formRef.value
    ?.validate()
    .then(() => {
      isDisabled.value = false
    })
    .catch(err => {
      isDisabled.value = true
    })
  let key: keyof typeof form
  for (key in form) {
    if (Object.prototype.hasOwnProperty.call(form, key)) {
      form[key] = ''
    }
  }
}
</script>

<template>
  <div class="exchange-container py-[46px] bg-[#f1f1f1]">
    <Navbar title="兑换红包" />
    <div class="h-screen p-4">
      <van-form @submit="onSubmit" ref="formRef">
        <van-field
          v-model="form.exchange_code"
          placeholder="请输入兑换码"
          :rules="rules.exchange_code"
          class="rounded"
          @input="validate"
        ></van-field>
        <van-field
          v-model="form.captcha_code"
          placeholder="请输入验证码"
          :rules="rules.captcha_code"
          class="rounded mt-2"
          @input="validate"
        >
          <template #button>
            <img class="ml-2" :src="captchaService.captcha.value" alt="" @click="captchaService.initCaptcha()" />
          </template>
        </van-field>
        <div class="mt-4">
          <van-button :disabled="isDisabled" block type="primary" native-type="submit">兑换</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
