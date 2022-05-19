<script setup lang="ts">
import {
  IMerchant,
  getMerchant,
  getGoodList,
  Category,
  getComments,
  Comment,
  Food,
  MerchantRating,
  getMerchantRating,
  MerchantCommentCate,
  getMerchantCommentCate,
} from '@/apis/merchantApi'
import { ref } from 'vue'
import ScrollNav from '@/components/common/scroll-nav.vue'
import Header from './components/header.vue'
import CommentComponent from './components/comment.vue'

const props = defineProps<{
  id: string
}>()
const merchant = ref<IMerchant>()
const goodList = ref<Category[]>([])
const comments = ref<Comment[]>([])
const rating = ref<MerchantRating>()
const commentCate = ref<MerchantCommentCate[]>([])
const currentFood = ref<Food>()
const foodShow = ref(false)
const active = ref('商品')

merchant.value = await getMerchant(props.id)!
goodList.value = await getGoodList(props.id)
comments.value = (await getComments(props.id)).map(item => {
  item.avatar = item.avatar.replace('jpeg', '.jpeg')
  return item
})
rating.value = await getMerchantRating(props.id)
commentCate.value = await getMerchantCommentCate(props.id)
const handleShowFood = (food: Food) => {
  foodShow.value = true
  currentFood.value = food
}
</script>

<template>
  <div class="merchant-container">
    <Header :merchant="merchant" />
    <van-tabs class="z-[999]" sticky border v-model:active="active" title-active-color="#4d8ee1" color="#4d8ee1">
      <van-tab title="商品">
        <template v-if="goodList.length">
          <scroll-nav :navs="goodList" :source="goodList" v-slot="{ cate }">
            <div class="item">
              <div class="title">
                <h2>
                  {{ cate.name }}
                  <span>{{ cate.description }}</span>
                </h2>
                <div>...</div>
              </div>
              <div class="content" id="content">
                <div class="good" v-for="food of cate.foods" :key="food._id" @click="handleShowFood(food)">
                  <img v-lazy="'http://elm.cangdu.org/img/' + food.image_path" alt="" />
                  <div v-if="food.attributes[0]" class="new">
                    <span>新品</span>
                  </div>
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
          </scroll-nav>
        </template>
        <van-empty v-else>暂无内容</van-empty>
      </van-tab>
      <van-tab title="评价">
        <div class="comment-container h-screen bg-[#f3f5f7]">
          <div class="rating bg-white border-b p-4 flex items-center justify-between h-[100px]">
            <div class="rating-rate-num text-xs text-center">
              <h2 class="text-[#fc9153] text-xl">{{ rating?.overall_score.toFixed(1) }}</h2>
              <div class="my-1">综合评分</div>
              <div class="text-[#999]">高于周边商家69.2%</div>
            </div>
            <div class="line h-full w-[1px] bg-[#e3e5e8]"></div>
            <div class="rating-rate text-xs flex flex-col gap-2">
              <div class="flex items-center gap-2">
                服务态度
                <van-rate
                  v-model="rating!.service_score"
                  :size="15"
                  color="#ffd21e"
                  void-icon="star"
                  void-color="#eee"
                />
                {{ rating?.service_score.toFixed(1) }}
              </div>
              <div class="flex items-center gap-2">
                商品评分
                <van-rate v-model="rating!.food_score" :size="15" color="#ffd21e" void-icon="star" void-color="#eee" />
                {{ rating?.food_score.toFixed(1) }}
              </div>
              <div class="flex items-center gap-2">
                送达时间
                <span class="text-gray-500">{{ rating?.deliver_time }}分钟</span>
              </div>
            </div>
          </div>
          <!--评论区-->
          <CommentComponent :comments="comments" :comment-cate="commentCate" />
        </div>
      </van-tab>
    </van-tabs>
    <transition
      class="animate__animated"
      appear
      enter-active-class="animate_fade_left"
      leave-active-class="animate_fade_out_left"
      mode="in-out"
    >
      <div v-if="foodShow" class="food-cover">
        <div class="w-[375px] h-[375px]">
          <img class="w-full h-full" :src="'http://elm.cangdu.org/img/' + currentFood?.image_path" alt="" />
          <van-icon class="back-icon" name="arrow-left" size="25" color="white" @click="foodShow = false" />
        </div>
        <div class="p-4 bg-white text-xs border-b">
          <h2 class="font-bold text-sm">手撕包菜</h2>
          <div class="text-gray-500 mt-2">月售29份 好评100%</div>
          <div class="mt-4 flex items-center justify-between">
            <div class="price text-[#f01414] text-sm">￥16</div>
            <div class="px-2.5 py-1 rounded-full bg-[#479ed7] text-white">加入购物车</div>
          </div>
        </div>
        <div class="comment-content p-4 bg-white border-y mt-4">
          <h2 class="text-sm">商品详情</h2>
          <p class="text-gray-500">description</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.animate_fade_left{
  animation-duration: 200ms;
}
.animate_fade_out_left{
  animation-duration: 200ms;
}
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

  .food-cover {
    @apply z-[9999999] w-screen h-screen bg-[#f3f5f7] absolute top-0 left-0;

    .back-icon {
      @apply absolute top-2 left-2;
    }
  }

}
</style>
