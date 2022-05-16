<script setup lang='ts'>
import { Comment } from '@/apis/merchantApi'

const props = defineProps<{
  comment: Comment
}>()
</script>

<template>
  <div class='item border-b py-4 flex items-start'>
    <img class='avatar w-[30px] h-[30px] rounded-full mr-2'
         src='http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
         alt=''>
    <div class='desc text-xs flex-1'>
      <div class='nickname flex justify-between'>
        <span>{{ comment.username }}</span>
        <span class='text-xs text-gray-500'>{{ comment.rated_at }}</span>
      </div>
      <van-rate
        class='my-2'
        v-model='comment.rating_star'
        :size='10'
        color='#ffd21e'
        void-icon='star'
        void-color='#eee'
      />
      <div>{{ comment.rating_text }}</div>
      <div class='food-tag mt-2 gap-2 flex items-center flex-wrap'>
        <span v-for='food of comment.item_ratings'
              class='px-[4px] py-[1px] border text-gray-500 text-xs'>{{ food.food_name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
