<script setup lang='ts'>
import authStore from '@/store/auth'

const auth = authStore()
const navigate = () => {
  location.href = 'https://activity-6.m.duiba.com.cn/'
}
</script>

<template>
  <div class='profile-container'>
    <div class='head' @click='$router.push("/profile/info")'>
      <img class='avatar' :src='"http://elm.cangdu.org/img/" + auth.profile?.avatar'
           alt=''>
      <div class='text-white ml-2 flex-1'>
        <h2 class='nickname font-bold text-[18px]'>{{ auth.profile.username }}</h2>
        <div class='text-sm flex items-center mt-1'>
          <van-icon name='phone-o' size='20' />
          暂无绑定手机号
        </div>
      </div>
      <van-icon color='white' name='arrow' />
    </div>
    <div class='meta'>
      <div
        class='item '>
        <div class='title'><span class='text-[#f19e38]'>{{ auth.profile.balance }}</span>元</div>
        <div class='subtitle mt-2'>我的余额</div>
      </div>
      <div
        class='item '>
        <div class='title'><span class='text-[#ed6a4a]'>{{ auth.profile.gift_amount }}</span>元
        </div>
        <div class='subtitle mt-2'>我的优惠</div>
      </div>
      <div class='item '>
        <div class='title'><span class='text-[#80c03c]'>{{ auth.profile.brand_member_new }}</span>元
        </div>
        <div class='subtitle mt-2'>我的积分</div>
      </div>
    </div>
    <div class='cell-group cell-1 mt-2'>
      <van-cell title='我的订单' icon='orders-o'>
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
  </div>
</template>

<style scoped lang='scss'>
.profile-container {
  .head {
    @apply bg-[#4d8ee1] h-[90px] flex items-center px-4;
    .avatar {
      @apply w-[60px] h-[60px] rounded-full;
    }
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
