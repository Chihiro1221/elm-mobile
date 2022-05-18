<script setup lang='ts'>
import { Comment, MerchantCommentCate } from '@/apis/merchantApi'
import { computed, ref } from 'vue'
import CommentItem from './comment-item.vue'

const props = defineProps<{
  comments: Comment[],
  commentCate: MerchantCommentCate[]
}>()
const onlyShow = ref(true)
const currentCommentCate = ref<MerchantCommentCate>()
currentCommentCate.value = props.commentCate[0]
const handleComments = computed(() => {
  const filterArr = props.comments.filter(item => item.rating_text)
  let result = onlyShow.value ? props.comments : filterArr
  result = result.filter(item => {
    return currentCommentCate.value?.name === '全部' ? item : item.tags.includes(currentCommentCate.value?.name)
  })
  return result
})
</script>

<template>
  <div class='comments border-t p-4 bg-white mt-4'>
    <div class='comment-cate bg-white mb-2 border-b flex items-center flex-wrap'>
      <div class='cate-tab bg-[#daecf7] text-xs px-[12px] block py-[8px] mr-2 mb-2'
           :class='{"bg-[#cccccc]":tag.unsatisfied,"!bg-[#479ed7] text-white":currentCommentCate?._id === tag._id}'
           v-for='tag of commentCate'
           @click='currentCommentCate = tag'
           :key='tag._id'>
        {{ tag.name }} {{ tag.count }}
      </div>
    </div>
    <div class='mb-2'>
      <van-checkbox v-model='onlyShow' checked-color='#50b14d'>只看有内容的评论</van-checkbox>
    </div>
    <div class='content'>
      <template v-if='handleComments.length'>
        <CommentItem :comment='comment' v-for='comment of handleComments' :key='comment._id' />
      </template>
      <van-empty v-else>暂无评论</van-empty>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
