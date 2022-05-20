import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

export default function async() {
  const route = useRoute()
  const discountVisible = ref(false)
  const exchangeVisible = ref(false)
  const recommendVisible = ref(false)
  const voucherVisible = ref(false)
  const historyVisible = ref(false)

  watchEffect(() => {
    discountVisible.value = route.path === '/profile/discount/detail'
    exchangeVisible.value = route.path === '/profile/discount/exchange'
    recommendVisible.value = route.path === '/profile/discount/recommend'
    voucherVisible.value = route.path === '/profile/discount/voucher'
    historyVisible.value = route.path === '/profile/discount/history'
  })

  return { discountVisible, exchangeVisible, recommendVisible, voucherVisible, historyVisible }
}