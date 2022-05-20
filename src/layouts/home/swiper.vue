<script setup lang='ts'>
import { getGoodCate, ICate } from '@/apis/cateApi'
import { ref } from 'vue'

const categories = ref<ICate[][]>([])

const fetch = async () => {
  const res = await getGoodCate()
  const arr: ICate[][] = []
  // 将数组拆成二维数组
  for (let i = 0, y = 8; y < res.length; y += 8, i++) {
    arr[i] = res.slice(0, 8)
  }
  categories.value = arr
}
fetch()
</script>

<template>
  <van-swipe class='my-swipe' indicator-color='#3478f6'>
    <van-swipe-item v-for='(item, i) of categories' :key='i' class='flex flex-wrap'>
      <div
        class='flex p-4 items-center justify-center flex-col w-1/4'
        v-for='cate of item'
        :key='cate.id'
        @click='$router.push(`/category?cate_id=${cate.id}&cate_name=${cate.title}`)'
      >
        <img class='mb-2 w-[40px] h-[40px]' :src="'https://fuss10.elemecdn.com/' + cate.image_url" alt='' />
        <div class='text-xs text-gray-500'>{{ cate.title }}</div>
      </div>
    </van-swipe-item>
  </van-swipe>
</template>

<style scoped lang='scss'></style>
