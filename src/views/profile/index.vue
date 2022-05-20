<script setup lang='ts'>
import authStore from '@/store/auth'
import FadeIn from '@/components/common/fade-in.vue'
import Info from '@/views/profile/info/index.vue'
import profileHook from '@/hooks/profile'

const auth = authStore()
const { infoShow } = profileHook()

const navigate = () => {
  location.href = 'https://activity-6.m.duiba.com.cn/'
}
</script>

<template>
  <div class='profile-container'>
    <div class='head' @click='$router.push(auth.profile ? "/profile/info" : "/login")'>
      <img v-if='auth.profile' class='avatar' :src='"http://localhost:8001/img/" + auth.profile?.avatar'
           alt=''>
      <img v-else class='avatar' src='/images/default-avatar.png' alt=''>
      <div class='text-white ml-2 flex-1'>
        <h2 class='nickname font-bold text-[18px]'>{{ auth.profile?.username ?? '登录/注册' }}</h2>
        <div class='text-sm flex items-center mt-1'>
          <van-icon name='phone-o' size='20' />
          暂无绑定手机号
        </div>
      </div>
      <van-icon color='white' name='arrow' />
    </div>
    <div class='meta'>
      <div class='item' @click='$router.push("/profile/balance")'>
        <div class='title'><span class='text-[#f19e38]'>{{ auth.profile?.balance ?? 0 }}</span>元</div>
        <div class='subtitle mt-2'>我的余额</div>
      </div>
      <div class='item' @click='$router.push("/profile/discount")'>
        <div class='title'><span class='text-[#ed6a4a]'>{{ auth.profile?.gift_amount ?? 0 }}</span>元
        </div>
        <div class='subtitle mt-2'>我的优惠</div>
      </div>
      <div class='item' @click='$router.push("/profile/integral")'>
        <div class='title'><span class='text-[#80c03c]'>{{ auth.profile?.brand_member_new ?? 0 }}</span>元
        </div>
        <div class='subtitle mt-2'>我的积分</div>
      </div>
    </div>
    <div class='cell-group cell-1 mt-2'>
      <van-cell @click='$router.push("/order")' title='我的订单' icon='orders-o'>
        <template #right-icon>
          <van-icon name='arrow' size='15' color='#888' />
        </template>
      </van-cell>
      <van-cell @click='navigate' title='积分商城'>
        <template #icon>
          <van-icon class='mr-1' name='bag' size='20' color='#ec825d' />
        </template>
        <template #right-icon>
          <van-icon name='arrow' size='15' color='#888' />
        </template>
      </van-cell>
      <van-cell @click='$router.push("/member")' title='饿了么会员卡'>
        <template #icon>
          <van-icon class='mr-1' name='gem' size='20' color='#f6c855' />
        </template>
        <template #right-icon>
          <van-icon name='arrow' size='15' color='#888' />
        </template>
      </van-cell>
    </div>
    <div class='cell-group cell-1 mt-2'>
      <van-cell @click='$router.push("/service")' title='服务中心'>
        <template #icon>
          <van-icon class='mr-1' name='friends' size='20' color='#62a3ea' />
        </template>
        <template #right-icon>
          <van-icon name='arrow' size='15' color='#888' />
        </template>
      </van-cell>
      <van-cell @click='$router.push("/download")' title='下载饿了么APP'>
        <template #icon>
          <van-icon class='mr-1' name='wechat' size='20' color='#62a3ea' />
        </template>
        <template #right-icon>
          <van-icon name='arrow' size='15' color='#888' />
        </template>
      </van-cell>
    </div>
    <fade-in :visible='infoShow'>
      <Info />
    </fade-in>
  </div>
</template>

<style scoped lang='scss'>
.profile-container {
  .head {
    @apply bg-[#4d8ee1] h-[90px] flex items-center px-4;

  }

  .meta {
    @apply flex items-center bg-white;
    .item {
      @apply w-1/3 p-4 border-r flex flex-col border-r-[#f8f8f8] justify-center items-center text-gray-500 text-sm;
      .title {
        span {
          @apply text-[28px] font-bold;
        }
      }
    }
  }

  .cell-group {
    .van-cell {
      @apply text-base border-b border-b-[#fbfbfb];
    }
  }
}
</style>
