<script setup lang="ts">
import { Category } from '@/apis/merchantApi'
import { computed, onMounted, ref } from 'vue'
import BetterScroll from '@better-scroll/core'

const prosp = defineProps<{
  navs: Category[]
  list: Category[]
}>()
const scrollTop = ref(0)
const menuRef = ref()
const contentRef = ref()
const list = ref<HTMLDivElement[]>([])
const heightList = ref<number[]>([])
const menuInstance = ref<any>()
const contentInstance = ref<any>()
function calculateHeight() {
  let height = 0
  list.value.forEach(el => {
    heightList.value.push(height)
    height += el.clientHeight
  })
}

onMounted(() => {
  setTimeout(() => {
    menuInstance.value = new BetterScroll(menuRef.value, {
      click: true,
      observeDOM: true,
    })
    calculateHeight()
    contentInstance.value = new BetterScroll(contentRef.value, {
      probeType: 3,
    })

    //触发滑动实时监听
    contentInstance.value.on('scroll', ({ y }: { y: number }) => {
      scrollTop.value = Math.abs(y)
    })
  }, 100)
})
const handleClick = (i: number) => {
  contentInstance.value.scrollToElement(list.value[i], 250, 0, 5)
}

const currentIndex = computed(() => {
  for (let i = 0; i < heightList.value.length; i++) {
    if (scrollTop.value >= heightList.value[i] && scrollTop.value <= heightList.value[i + 1]) {
      return i
    }
  }
})
</script>

<template>
  <div class="container">
    <nav ref="menuRef" class="nav" id="nav">
      <div>
        <div
          :class="{ active: i === currentIndex }"
          class="item"
          v-for="(item, i) of navs"
          :key="item.id"
          @click="handleClick(i)"
        >
          {{ item.name }}
        </div>
      </div>
    </nav>
    <div class="content" ref="contentRef">
      <div class="box">
        <div class="item" v-for="cate of list" :key="cate.id" :ref="item => list.push(item as HTMLDivElement)">
          <slot :item="cate" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
