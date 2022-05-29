<script setup lang="ts">
import { ref } from 'vue'
import ScrollNav from '@/components/common/scroll-nav.vue'
import Header from './components/header.vue'
import CommentComponent from './components/comment.vue'
import FadeIn from '@/components/common/fade-in.vue'
import merchantHook from '@/hooks/merchant'
import cartStore from '@/store/cart'
import type { Category } from '@/apis/merchantApi'

const cart = cartStore()
const props = defineProps<{
  id: string
}>()

const {
  commentCate,
  comments,
  currentFood,
  foodShow,
  goodList,
  merchant,
  rating,
  showFood,
  handleSelectFood,
  spceVisible,
  selectedFood,
  selectedFoodSpec,
  addCart,
  cartDetailVisible,
  showCartDetail,
  cartDetailVisibleComputed,
} = await merchantHook(props)
const active = ref('商品')
</script>

<template>
  <div class="merchant-container">
    <Header :merchant="merchant!" />
    <van-tabs class="z-[999]" sticky border v-model:active="active" title-active-color="#4d8ee1" color="#4d8ee1">
      <van-tab title="商品">
        <template v-if="goodList.length">
          <scroll-nav :navs="goodList" :source="goodList" v-slot="{ cate }: { cate: Category }">
            <div class="item">
              <div class="title">
                <h2>
                  {{ cate.name }}
                  <span>{{ cate.description }}</span>
                </h2>
                <div>...</div>
              </div>
              <div class="content" id="content">
                <div class="good" v-for="food of cate.foods" :key="food._id" @click="showFood(food)">
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
                      <span class="add flex items-center">
                        <transition
                          class="animate__animated"
                          enter-active-class="animate__fadeInRight"
                          leave-active-class="animate__fadeOutRight"
                        >
                          <div
                            v-if="cart.isAdded(food)"
                            @click.stop="cart.remove(food)"
                            class="w-[18px] h-[18px] text-[#5d8cdb] bg-white border border-[#5d8cdb] rounded-full text-white flex items-center justify-center"
                          >
                            <van-icon name="minus" size="5"></van-icon>
                          </div>
                        </transition>
                        <transition
                          class="animate__animated"
                          enter-active-class="animate__fadeIn"
                          leave-active-class="animate__fadeOut"
                        >
                          <div v-if="cart.isAdded(food)" class="add-num mx-2">{{ cart.isAdded(food) }}</div>
                        </transition>
                        <van-icon
                          @click.stop="cart.add(food, 0)"
                          v-if="food.specfoods.length === 1"
                          name="add"
                          size="20"
                          color="#4d8ee1"
                        />
                        <button
                          @click.stop="handleSelectFood(food)"
                          v-else
                          class="bg-[#4d8ee1] py-1 px-2 text-white rounded"
                        >
                          选规格
                        </button>
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
    <!-- 食物详情 -->
    <fade-in :visible="foodShow">
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
    </fade-in>
    <div class="footer" @click="showCartDetail">
      <div class="icon" :class="{ active: cart.count }">
        <van-icon name="shopping-cart" size="33" color="white" />
        <div class="num" v-if="cart.count">{{ cart.count }}</div>
      </div>
      <div class="price">
        <div class="num">￥{{ cart.totalPrice }}</div>
        <div>配送费￥5</div>
      </div>
      <div class="payment" v-if="cart.diffPrice">还差{{ cart.diffPrice }}元起送</div>
      <div v-else class="payment !bg-[#2ecc71]" @click.stop>立即结算</div>
    </div>
    <!-- 规格遮罩层 -->
    <van-overlay :lock-scroll="false" :show="spceVisible" :z-index="2100" @click="spceVisible = false">
      <div class="overlay-wrapper" @click.stop>
        <div class="content">
          <div class="title">{{ selectedFood?.name }}</div>
          <div class="spec">
            <div class="tip">规格</div>
            <div class="item-container">
              <div
                v-for="(spec, index) of selectedFood?.specfoods"
                :key="spec._id"
                class="item"
                :class="{ active: selectedFoodSpec === index }"
                @click="selectedFoodSpec = index"
              >
                {{ spec.specs_name }}
              </div>
            </div>
          </div>
          <div class="foot">
            <div class="price">
              ￥
              <span>{{ selectedFood?.specfoods[selectedFoodSpec].price }}</span>
            </div>
            <van-button type="primary" class="rounded" size="small" @click="addCart">加入购物车</van-button>
          </div>
          <van-icon @click="spceVisible = false" name="cross" class="close-btn" />
        </div>
      </div>
    </van-overlay>
    <!-- 购物车详情 -->
    <transition
      appear
      class="animate__animated"
      enter-active-class="animate__fadeIn"
      leave-active-class="animate__fadeOut"
    >
      <div v-if="cartDetailVisible && cartDetailVisibleComputed" class="cart-desc">
        <div @click="showCartDetail" class="cart-mark"></div>
      </div>
    </transition>
    <transition appear enter-active-class="animate-fadeUp" leave-active-class="animate-fadeUpOut">
      <div v-if="cartDetailVisible && cartDetailVisibleComputed" class="cart-content">
        <div class="title">
          <div class="text">购物车</div>
          <div class="clear" @click="cart.clear">
            <van-icon name="delete-o" />
            清空
          </div>
        </div>
        <div class="food-list">
          <div v-for="food of cart.originalCarts" :key="food.id" class="food">
            <div class="name">{{ food.name }}</div>
            <div class="num">
              <div class="price">￥{{ food.price }}</div>
              <div class="flex items-center">
                <div
                  @click="cart.removeByItem(food)"
                  class="w-[18px] h-[18px] bg-white border border-[#5d8cdb] rounded-full text-[#5d8cdb] flex items-center justify-center"
                >
                  <van-icon name="minus" size="5"></van-icon>
                </div>
                <div class="add-num mx-2">{{ food.quantity }}</div>
                <van-icon @click="food.quantity++" name="add" size="20" color="#4d8ee1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.animate_fade_left {
  animation-duration: 200ms;
}

.animate_fade_out_left {
  animation-duration: 200ms;
}
.animate__fadeInRight,
.animate__fadeIn {
  animation-duration: 300ms;
}

.animate__fadeOutRight,
.animate__fadeOut {
  animation-duration: 300ms;
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

  .footer {
    @apply bg-[#3d3d3f] fixed bottom-0 left-0 w-full z-[2100] flex;
    .icon {
      @apply bg-[#3d3d3f] border-4 border-[#444444] rounded-full p-2 ml-3 bottom-2 absolute;
      &.active {
        @apply bg-[#4d8ee1];
      }
      .num {
        @apply absolute -top-1 -right-2 text-xs bg-[#eb5633] rounded-full text-white w-[16px] h-[16px] text-center;
      }
    }

    .price {
      @apply text-white text-xs ml-[80px] text-gray-200 py-2 flex-1;
      .num {
        @apply text-[18px] mb-1 text-white;
      }
    }

    .payment {
      @apply bg-[#535356] w-[117px] text-white flex items-center justify-center text-base;
    }
  }

  .overlay-wrapper {
    @apply h-screen w-full flex justify-center items-center;
    .content {
      @apply w-[250px] bg-white rounded relative;
      .title {
        @apply text-sm p-4 text-center;
      }

      .spec {
        @apply mt-2 px-4;
        .tip {
          @apply text-sm text-gray-500 mb-2;
        }

        .item-container {
          @apply flex items-center flex-wrap gap-2 text-sm;
          .item {
            @apply border border-[#eee] py-1 px-2 rounded;
            &.active {
              @apply border-[#5197e2] text-[#5197e2];
            }
          }
        }
      }

      .foot {
        @apply py-4 mt-4 bg-[#f9f9f9] flex items-center justify-between px-2;
        .price {
          @apply text-sm text-[#ff6000];
          span {
            @apply text-xl font-bold;
          }
        }
      }

      .close-btn {
        @apply absolute top-2 right-2;
      }
    }
  }

  .cart-desc {
    @apply fixed top-0 left-0 right-0 bottom-0 z-[2050];
    .cart-mark {
      @apply absolute w-full h-screen bg-black opacity-[.5] z-[2049];
    }
  }
  .cart-content {
    @apply absolute bg-white w-full z-[2050] bottom-[52px];
    .title {
      @apply flex items-center justify-between px-4 py-2 bg-[#edeff1];
      .text {
        @apply text-[#666];
      }
      .clear {
        @apply text-[#666] text-sm;
      }
    }
    .food-list {
      .food {
        @apply flex items-center justify-between p-4;
        .num {
          @apply flex items-center;
          .price {
            @apply text-[#f60] mr-4;
          }
        }
      }
    }
  }
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeUpOut {
  0% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}
.animate-fadeUp {
  animation: fadeUp 0.3s;
}
.animate-fadeUpOut {
  animation: fadeUpOut 0.3s;
}
</style>
