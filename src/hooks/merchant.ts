import {
  Category,
  Comment,
  Food,
  getComments,
  getGoodList,
  getMerchant,
  getMerchantCommentCate,
  getMerchantRating,
  IMerchant,
  MerchantCommentCate,
  MerchantRating,
  Specfood,
} from '@/apis/merchantApi'
import { computed, ref } from 'vue'
import cartStore from '@/store/cart'

export default async function (props: { id: string }) {
  const merchant = ref<IMerchant>()
  const goodList = ref<Category[]>([])
  const comments = ref<Comment[]>([])
  const rating = ref<MerchantRating>()
  const cart = cartStore()
  const commentCate = ref<MerchantCommentCate[]>([])

  // 食物详情显隐
  const spceVisible = ref(false)
  const foodShow = ref(false)
  // 食物规格
  const currentFood = ref<Food>()
  const selectedFood = ref<Food>()
  const selectedFoodSpec = ref(0)
  // 购物车详情
  const cartDetailVisible = ref(false)
  const cartDetailVisibleComputed = computed(() => {
    const state = !!cart.originalCarts.length
    if (!state) cartDetailVisible.value = state
    return state
  })

  merchant.value = await getMerchant(props.id)!
  goodList.value = await getGoodList(props.id)
  comments.value = (await getComments(props.id)).map(item => {
    item.avatar = item.avatar.replace('jpeg', '.jpeg')
    return item
  })
  rating.value = await getMerchantRating(props.id)
  commentCate.value = await getMerchantCommentCate(props.id)

  // 显示食物详情
  const showFood = (food: Food) => {
    foodShow.value = true
    currentFood.value = food
  }

  // 选择食物规格
  const handleSelectFood = (food: Food) => {
    spceVisible.value = true
    selectedFood.value = food
  }

  // 添加购物车
  const addCart = () => {
    cart.add(selectedFood.value!, selectedFoodSpec.value)
    spceVisible.value = false
  }

  // 显示购物车详情
  const showCartDetail = () => {
    if (!cart.originalCarts.length) return
    cartDetailVisible.value = !cartDetailVisible.value
  }

  return {
    merchant,
    goodList,
    comments,
    rating,
    commentCate,
    currentFood,
    foodShow,
    spceVisible,
    selectedFood,
    showFood,
    handleSelectFood,
    selectedFoodSpec,
    addCart,
    cartDetailVisible,
    showCartDetail,
    cartDetailVisibleComputed,
  }
}
