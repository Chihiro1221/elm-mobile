<script setup lang='ts'>
import { IMerchant, getMerchant, getGoodList, Category, getComments, Comment } from '@/apis/merchantApi'
import { ref } from 'vue'
import ScrollNav from '@/components/common/scroll-nav.vue'
import Header from './components/header.vue'

const props = defineProps<{
  id: string
}>()
const merchant = ref<IMerchant>()
const goodList = ref<Category[]>([])
const comments = ref<Comment[]>([])
const active = ref('商品')
merchant.value = await getMerchant(props.id)!
goodList.value = await getGoodList(props.id)
comments.value = await getComments(props.id)

</script>

<template>
  <div class='merchant-container'>
    <Header :merchant='merchant' />
    <van-tabs class='z-[999]' sticky border v-model:active='active' title-active-color='#4d8ee1' color='#4d8ee1'>
      <van-tab title='商品'>
        <template v-if='goodList.length'>
          <scroll-nav :navs='goodList' :source='goodList' v-slot='{ cate }'>
            <div class='item'>
              <div class='title'>
                <h2>
                  {{ cate.name }}
                  <span>{{ cate.description }}</span>
                </h2>
                <div>...</div>
              </div>
              <div class='content' id='content'>
                <div class='good' v-for='food of cate.foods' :key='food._id'>
                  <img v-lazy="'http://elm.cangdu.org/img/' + food.image_path" alt='' />
                  <div v-if='food.attributes[0]' class='new'>
                    <span>新品</span>
                  </div>
                  <div class='desc'>
                    <div class='name'>
                      {{ food.name }}
                      <div v-if='food.attributes.length' class='flex items-center gap-1'>
                        <span
                          class='tag'
                          v-for='(attr, i) of food.attributes'
                          :key='i'
                          :style='{ color: attr?.icon_color, borderColor: attr?.icon_color }'
                        >
                          {{ attr?.icon_name }}
                        </span>
                      </div>
                    </div>
                    <div class='detail'>{{ food.description }}</div>
                    <div class='meta'>
                      <div>月售{{ food.rating_count }}份 好评率{{ food.satisfy_rate }}%</div>
                    </div>
                    <div v-if='food.activity' class='tag-container'>
                      <span class='tag' :style='{ color: food?.activity?.image_text_color }'>
                        {{ food.activity?.image_text }}
                      </span>
                    </div>
                    <div class='price'>
                      <span class='num'>
                        $
                        <span>{{ food.specfoods[0]?.price }}</span>
                      </span>
                      <span class='add'>
                        <van-icon name='add' size='20' color='#4d8ee1' />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </scroll-nav>
        </template>
      </van-tab>
      <van-tab title='评价'>评价</van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang='scss'>
.merchant-container {

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
        @apply flex p-2 border-b border-b-[#eee] relative overflow-hidden;
        img {
          @apply w-[50px] h-[50px];
        }

        .new {
          @apply absolute bg-[#76d672] text-white text-xs px-2 py-1 w-[60px] h-[60px] -translate-x-3/4 -translate-y-3/4 rotate-[45deg];
          span {
            @apply rotate-[-90deg] mb-2 absolute bottom-[.9rem] -right-1 scale-75;
          }
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
</style>
