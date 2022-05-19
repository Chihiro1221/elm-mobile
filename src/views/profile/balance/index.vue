<script setup lang='ts'>
import { useRoute } from 'vue-router'
import Navbar from '@/components/common/navbar.vue'
import FadeIn from '@/components/common/fade-in.vue'
import { ref, watchEffect } from 'vue'

const route = useRoute()
const show = ref(false)

watchEffect(() => {
  show.value = route.path === '/profile/balance/detail'
})
</script>

<template>
  <div class='balance-container'>
    <Navbar title='我的余额' />
    <div class='card'>
      <div class='content '>
        <div class='title'>
          <div class='text-gray-500'>当前余额</div>
          <div @click='$router.push("balance/detail")' class='flex items-center text-[#5d8cdb]'>
            <van-icon class='mr-1' name='question' color='rgb(77, 142, 225)' />
            余额说明
          </div>
        </div>
        <div class='money mt-2 mb-4'>
          <strong class='text-4xl font-normal'>0.00</strong>
          <span>元</span>
        </div>
        <van-button disabled block type='default' color='#999'>提现</van-button>
      </div>
    </div>
    <div class='deal '>
      <div class='title'>交易明细</div>
      <van-empty image-size='100' description='暂无明细记录' />
    </div>
    <FadeIn :visible='show'>
      <div class='bg-white w-full h-full pt-[46px]'>
        <Navbar title='余额问题' />
        <div data-v-76ea38e5='' class='markdown p-4'>
          <h3 data-v-76ea38e5='' id='q1-'>Q1: 使用余额的条件</h3>
          <p data-v-76ea38e5=''>为了保护账户安全，使用余额前必须先绑定手机号。</p>
          <h3 data-v-76ea38e5='' id='q2-'>Q2: 余额可以怎么用？</h3>
          <p data-v-76ea38e5=''>余额可以在饿了么平台上提现，当余额大于等于待支付金额时可以在支持在线支付的商家中进行消费。提现功能将于2016年12月25日00:00全面开放。</p>
          <h3 data-v-76ea38e5='' id='q3-'>Q3:我要如何提现？</h3>
          <p data-v-76ea38e5=''>
            为了保护账户和资金安全，您在提现前需要输入真实姓名和用该姓名开通的银行卡号、选择开户行，并验证已绑定饿了么账号的手机号。每日只能提现1次，每次限额50元。若提现金额超过50元，点击【提现】时系统会提示您已超额，请您修改提现金额。</p>
          <h3 data-v-76ea38e5='' id='q4-'>Q4:为什么会提现失败？</h3>
          <p data-v-76ea38e5=''>可能原因有：您的姓名、开户行、银行卡号等信息不匹配；您当日的提现次数和金额超过限制；您的账户存在异常，被风控拦截。</p></div>
      </div>
    </FadeIn>
  </div>
</template>

<style scoped lang='scss'>
.balance-container {
  @apply pt-[46px] h-screen bg-[#f5f5f5];
  .card {
    @apply p-2 rounded-sm;
    background-color: $primary-color;

    .content {
      @apply rounded-sm bg-white p-2;
      .title {
        @apply text-sm flex items-center justify-between;
      }
    }
  }


  .deal {
    @apply text-sm text-gray-500 p-3;
  }

  .markdown {
    h3 {
      @apply my-3;
    }

    p {
      @apply text-sm text-[#666];
    }
  }
}
</style>
