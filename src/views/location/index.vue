<script setup lang="ts">
import CitySelector from '@/views/location/components/city-selector.vue'
import { ICity, getCurrentCity, getHotCities, getCities } from '@/apis/cityApi'
import { ref } from 'vue'
import router from '@/router'

const currentCity = ref<ICity>()
const hotCities = ref<ICity[]>([])
const cities = ref<{ [key: string]: ICity[] }>()
currentCity.value = await getCurrentCity()
hotCities.value = await getHotCities()
cities.value = await getCities()

const gotoCitySelector = (city: ICity) => {
  router.push(`/city/${city.id}`)
}
</script>

<template>
  <div class="location-container">
    <van-nav-bar fixed left-text="饿了么" right-text="登录|注册" @click-left="$router.push('/')" />
    <van-cell title-class="cell-title" value-class="cell-value" class="border-b">
      <template #title>
        <div class="text-xs flex-1 text-gray-500">当前定位城市：</div>
      </template>
      <template #value>
        <div class="text-xs w-auto text-gray-500">定位不准时，请在城市列表中选择</div>
      </template>
    </van-cell>
    <van-cell class="border-b" @click="gotoCitySelector(currentCity!)">
      <template #title>
        <div class="text-[16px] address-title">{{ currentCity?.name }}</div>
      </template>
      <template #right-icon>
        <van-icon name="arrow" class="flex items-center" />
      </template>
    </van-cell>
    <div v-if="hotCities.length && cities">
      <CitySelector title="热门城市" :cities="hotCities" hot @change="gotoCitySelector" />
      <div class="cities">
        <CitySelector
          v-for="(city, key) of cities"
          :title="(key as unknown as string)"
          :cities="city"
          @change="gotoCitySelector"
        />
      </div>
    </div>
    <div v-else class="h-screen flex flex-col pt-40 items-center">
      <van-loading type="spinner" color="#1989fa" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.location-container {
  min-height: 100vh;
  padding-top: 50px;
  background-color: #f5f5f5;

  .address-title {
    color: $primary-color;
  }
}
</style>
