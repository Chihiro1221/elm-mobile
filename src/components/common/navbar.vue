<script setup lang='ts'>
import router from '@/router'

interface IProps {
  title?: string,
  right?: string,
  onLeftClick?: Function,
  onRightClick?: Function,
}

const props = withDefaults(defineProps<IProps>(), {
  title: '默认标题'
})
const handleLeftClick = () => {
  props.onLeftClick ? props.onLeftClick() : router.back()

}
</script>

<template>
  <van-nav-bar fixed>
    <template #title>
      <div>{{ title }}</div>
    </template>
    <template #left>
      <div>
        <van-icon @click='handleLeftClick' name='arrow-left' size='20' />
      </div>
    </template>
    <template #right>
      <div @click='onRightClick' class='text-white'>{{ right }}</div>
    </template>
  </van-nav-bar>
</template>

<style scoped lang='scss'>

</style>
