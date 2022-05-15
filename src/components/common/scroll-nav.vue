<script setup lang="ts">
import { Category } from '@/apis/merchantApi'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import BetterScroll, { BScrollInstance } from '@better-scroll/core'

const props = defineProps<{
  navs: Category[]
  source: Category[]
}>()
const scrollTop = ref(0)
const menuRef = ref()
const contentRef = ref()
const list = ref<HTMLDivElement[]>([])
const heightList = ref<number[]>([])
const menuInstance = ref<BScrollInstance>()
const contentInstance = ref<BScrollInstance>()
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
onUnmounted(() => {
  menuInstance.value?.destory()
  contentInstance.value?.destory()
})
const handleClick = (i: number) => {
  contentInstance.value?.scrollToElement(list.value[i], 250, 0, 5)
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
        <div v-for="cate of source" :key="cate.id" :ref="item => list.push(item as HTMLDivElement)">
          <slot :cate="cate"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  .nav {
    @apply w-[90px] fixed left-0;
    height: calc(100vh - 44px - 138px);
    .item {
      @apply px-4 py-6 bg-[#f5f5f5] text-sm text-gray-500 truncate;
      &.active {
        @apply bg-white relative font-bold;
        &::before {
          content: '';
          @apply h-full w-[4px] bg-[#4d8ee1] block absolute top-0 left-0;
        }
      }
    }
  }
  > .content {
    @apply ml-[90px] overflow-auto;
    height: calc(100vh - 44px - 138px);
  }
}
</style>
