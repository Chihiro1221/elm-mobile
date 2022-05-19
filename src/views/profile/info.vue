<script setup lang='ts'>
import Navbar from '@/components/common/navbar.vue'
import authStore from '@/store/auth'
import { Dialog } from 'vant'
import router from '@/router'
import { uploadAvatar, UploadResult } from '@/apis/uploadApi'

const auth = authStore()
const logout = () => {
  Dialog.confirm({ title: '警告', message: '确定退出登录吗?' }).then(() => {
    auth.logout()
    router.push('/profile')
  })
}
const beforeUpload = async (file: File) => {
  await uploadAvatar(file, auth.profile?.id!)
}
const afterUpload = (file: UploadResult) => {
  if (file) {
    auth.initUserProfile()
  }
}
const handleBind = () => {
  Dialog.confirm({ title: '警告', message: '请在App中绑定', showCancelButton: false })
}

const leftClick = () => {
  router.push('/profile')
}
</script>

<template>
  <div class='info-container'>
    <Navbar title='账户信息' :onLeftClick='leftClick' />
    <van-uploader class='w-full' accept='image/*' :after-read='afterUpload' :before-read='beforeUpload'>
      <van-cell class='border-b w-full'>
        <template #title>
          <div class='flex items-center h-full'>
            <span>头像</span>
          </div>
        </template>
        <template #right-icon>
          <div class='flex items-center'>
            <img class='avatar mr-1' :src="'http://localhost:8001/img/' + auth.profile.avatar" alt=''>
            <van-icon name='arrow' class='search-icon' size='20' color='#999' />
          </div>
        </template>
      </van-cell>
    </van-uploader>
    <van-cell class='border-b' @click='$router.push("/profile/info/change-username")'>
      <template #title>
        <div class='flex items-center h-full'>
          <span>用户名</span>
        </div>
      </template>
      <template #right-icon>
        <div class='flex items-center'>
          <div class='text-[#999]'>{{ auth.profile.username }}</div>
          <van-icon name='arrow' class='search-icon' size='20' color='#999' />
        </div>
      </template>
    </van-cell>
    <van-cell class='border-b' @click='$router.push("/profile/info/address")'>
      <template #title>
        <div class='flex items-center h-full'>
          <span>收货地址</span>
        </div>
      </template>
      <template #right-icon>
        <div class='flex items-center'>
          <van-icon name='arrow' class='search-icon' size='20' color='#999' />
        </div>
      </template>
    </van-cell>
    <div class='binding mt-2'>
      <div class='p-2 text-xs text-gray-500'>账号绑定</div>
      <van-cell class='border' @click='handleBind'>
        <template #title>
          <div class='flex items-center h-full'>
            <van-icon name='graphic' class='mr-1 text-[#5d8cdb]' size='20' />
            <span>手机</span>
          </div>
        </template>
        <template #right-icon>
          <div class='flex items-center'>
            <van-icon name='arrow' class='search-icon' size='20' color='#999' />
          </div>
        </template>
      </van-cell>
    </div>
    <div class='binding mt-2'>
      <div class='p-2 text-xs text-gray-500'>安全设置</div>
      <van-cell class='border' @click='$router.push("/forget-password")'>
        <template #title>
          <div class='flex items-center h-full'>
            <span>登录密码</span>
          </div>
        </template>
        <template #right-icon>
          <div class='flex items-center'>
            <div class='text-gray-400'>修改</div>
            <van-icon name='arrow' class='search-icon' size='20' color='#999' />
          </div>
        </template>
      </van-cell>
    </div>
    <div class='px-2 py-4'>
      <van-button type='danger' color='#c96050' size='small' class='rounded-sm' block @click='logout'>退出登录
      </van-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.info-container {
  @apply z-[2000] w-full h-screen bg-violet-500 absolute top-0 left-0 bg-[#f2f2f2] pt-[46px]
}

.van-nav-bar {
  position: absolute;
}


</style>
