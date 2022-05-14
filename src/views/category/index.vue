<script setup lang="ts">
import { getMerchants, IMerchant } from '@/apis/merchantApi'
import { ref, watch } from 'vue'
import { LocationQuery, useRoute } from 'vue-router'
import MerchantItem from '@/components/merchant/item.vue'

type query = LocationQuery & { cate_id: string; cate_name: string }
const route = useRoute()
const merchants = ref<IMerchant[]>([])
const query = ref<query>()
watch(
  () => route,
  async () => {
    query.value = route.query as query
    merchants.value = await getMerchants({
      restaurant_category_id: query.value.cate_id,
    })
  },
  { immediate: true }
)
</script>

<template>
  <div class="category">
    <van-nav-bar fixed @click-left="$router.back()">
      <template #title>
        <div>{{ query?.cate_name }}</div>
      </template>
      <template #left>
        <div><van-icon name="arrow-left" size="20" /></div>
      </template>
    </van-nav-bar>
    <div class="content">
      <MerchantItem v-for="item of merchants" :key="item.id" :merchant="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.category {
  padding-top: 50px;
}
</style>
