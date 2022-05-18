<script setup lang='ts'>
import Navbar from '@/components/common/navbar.vue'
import { reactive, ref } from 'vue'

const username = ref('')
const regex = /^\S{5,25}$/
const rules = reactive([
  { pattern: regex, message: '用户名在5到25个字符之间' }
])

const onSubmit = () => {
  console.log('提交修改')
}
</script>

<template>
  <div class='change-username'>
    <Navbar title='修改用户名' />
    <div class='content p-2'>
      <van-form @submit='onSubmit'>
        <van-field v-model='username' placeholder='请输入用户名' name='username' :rules='rules' />
        <div class='py-2 text-xs text-gray-500'>用户名只能修改一次（5~24字符之间）</div>
        <van-button class='mt-2' :disabled='!regex.test(username)' native-type='submit' block type='primary'>确认提交
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.change-username {
  @apply absolute top-0 left-0 right-0 bottom-0 w-full h-screen bg-[#f2f2f2] pt-[46px];
  z-index: 2001;
}

.van-nav-bar {
  position: absolute;
}

</style>
