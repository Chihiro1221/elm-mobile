<script setup lang="ts">
import { IMerchant, getMerchant, getGoodList, Category } from '@/apis/merchantApi'
import { computed, onMounted, ref } from 'vue'
import BetterScroll from '@better-scroll/core'

const props = defineProps<{
  id: string
}>()
const merchant = ref<IMerchant>()
const goodList = ref<Category[]>([])
const active = ref('商品')
const scrollTop = ref(0)
const menuRef = ref()
const contentRef = ref()
const list = ref<HTMLDivElement[]>([])
const heightList = ref<number[]>([])
const menuInstance = ref<any>()
const contentInstance = ref<any>()
merchant.value = await getMerchant(props.id)!
goodList.value = await getGoodList(props.id)

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
  <div class="merchant-container">
    <van-tabs class="z-[999]" sticky border v-model:active="active" title-active-color="#4d8ee1" color="#4d8ee1">
      <van-tab title="商品">
        <div class="container">
          <nav ref="menuRef" class="nav" id="nav">
            <div>
              <div
                :class="{ active: i === currentIndex }"
                class="item"
                v-for="(item, i) of goodList"
                :key="item.id"
                @click="handleClick(i)"
              >
                {{ item.name }}
              </div>
            </div>
          </nav>
          <div class="content" ref="contentRef">
            <div class="box">
              <div
                class="item"
                v-for="cate of goodList"
                :key="cate.id"
                :ref="item => list.push(item as HTMLDivElement)"
              >
                <div class="title">
                  <h2>
                    {{ cate.name }}
                    <span>{{ cate.description }}</span>
                  </h2>
                  <div>...</div>
                </div>
                <div class="content" id="content">
                  <div class="good" v-for="food of cate.foods" :key="food._id">
                    <img :src="'http://elm.cangdu.org/img/' + food.image_path" alt="" />
                    <div class="desc">
                      <div class="name">
                        {{ food.name }}
                        <div v-if="food.attributes.length" class="flex items-center gap-1">
                          <span
                            class="tag"
                            v-for="(attr, i) of food.attributes"
                            :key="i"
                            :style="{ color: attr?.icon_color, borderColor: attr?.icon_color }"
                          >
                            {{ attr?.icon_name }}
                          </span>
                        </div>
                      </div>
                      <div class="detail">{{ food.description }}</div>
                      <div class="meta">
                        <div>月售{{ food.rating_count }}份 好评率{{ food.satisfy_rate }}%</div>
                      </div>
                      <div v-if="food.activity" class="tag-container">
                        <span class="tag" :style="{ color: food?.activity?.image_text_color }">
                          {{ food.activity?.image_text }}
                        </span>
                      </div>
                      <div class="price">
                        <span class="num">
                          $
                          <span>{{ food.specfoods[0]?.price }}</span>
                        </span>
                        <span class="add">
                          <van-icon name="add" size="20" color="#4d8ee1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="评价">评价</van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="scss">
.merchant-container {
  .container {
    .nav {
      @apply w-[90px] fixed left-0;
      height: calc(100vh - 44px);
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
      height: calc(100vh - 44px);
      .item {
        .title {
          @apply flex items-center bg-[#f5f5f5] px-2 py-4 justify-between;
          h2 {
            @apply text-gray-600;
            span {
              @apply text-xs text-gray-400;
            }
          }
        }
        .content {
          .good {
            @apply flex p-2 border-b border-b-[#eee];
            img {
              @apply w-[50px] h-[50px];
            }
            .tag {
              @apply text-xs text-[#e07a77] border border-[#e07a77] rounded-full scale-75 px-1 inline-block;
            }
            .desc {
              @apply flex-1 ml-4;
              .name {
                @apply flex items-center justify-between;
              }
              .detail {
                @apply text-xs text-gray-500 mt-1;
              }
              .meta {
                @apply text-xs text-gray-600 mt-1;
              }
              .price {
                @apply flex items-center justify-between;
                .num {
                  @apply text-[#ed702d] text-xs;
                  span {
                    @apply font-bold text-base;
                  }
                }
                .add {
                  @apply text-xs text-gray-500;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
