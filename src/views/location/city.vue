<script setup lang="ts">
import { getCityById, IAddress, ICity, searchCities } from '@/apis/cityApi'
import { ref } from 'vue'
import { Toast } from 'vant'
import store from '@/utils/store'
import { LocationEnum } from '@/enum/LocationEnum'
import locationStore from '@/store/loaction'
import router from '@/router'

const props = defineProps<{
  id: string
}>()

const city = ref<ICity>()
const search = ref('')
const cities = ref<IAddress[]>([])
const location = locationStore()
const isClear = ref(location.history ? true : false)

city.value = await getCityById(props.id)
if (location.history) {
  cities.value = location.history
}

const submitSearch = async () => {
  if (!search.value) {
    return Toast('请输入搜索内容')
  }
  Toast.loading({ message: '搜索中...' })
  cities.value = await searchCities(city.value!.id, search.value)
  Toast.clear()
  isClear.value = false
  if (!cities.value.length) {
    Toast('没有搜索到相关内容')
  }
}
const selectCity = (city: IAddress) => {
  if (location.history) {
    location.history.push(city)
    store.set(LocationEnum.LOCATION_HISTORY_KEY, location.history)
  } else {
    location.history = [city]
    store.set(LocationEnum.LOCATION_HISTORY_KEY, location.history)
  }
  // 存储到localStore,存储状态到pinia
  store.set(LocationEnum.LOCATION_KEY, city)
  location.initLocation(city)
  router.push('/')
}

const clearHistory = () => {
  isClear.value = false
  store.remove(LocationEnum.LOCATION_HISTORY_KEY)
  location.history = []
  cities.value = []
}
</script>

<template>
  <div class="city-selector">
    <van-nav-bar
      fixed
      left-arrow
      :title="city?.name"
      right-text="切换城市"
      @click-right="$router.push('/location')"
      @click-left="$router.back()"
    />
    <div class="content">
      <van-field v-model="search" border placeholder="输入学校、商务楼、地址" />
      <van-button class="mt-4" block type="primary" size="normal" @click="submitSearch">提交</van-button>
    </div>
    <div class="history">
      <div class="title">搜索历史</div>
      <div v-if="cities.length" class="cities">
        <div @click="selectCity(city)" class="city" v-for="(city, index) of cities" :key="index">
          <h2 class="name">{{ city.name }}</h2>
          <div class="desc">{{ city.address }}</div>
        </div>
      </div>
      <van-empty v-else description="暂无内容" />
      <div v-if="isClear" class="py-2 w-full text-center border-t text-gray-500" @click="clearHistory">清空历史</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.city-selector {
  padding-top: 50px;
  height: 100vh;
  background-color: #f5f5f5;

  .content {
    @apply px-4 py-2 bg-white;
  }

  .history {
    @apply py-2 bg-white;
    .title {
      @apply text-xs text-gray-500 border-b py-2 px-4;
    }

    .cities {
      .city {
        @apply px-4 py-2 bg-white border-b;
        .name {
          @apply text-sm text-gray-600;
        }

        .desc {
          @apply text-xs text-gray-500 mt-2;
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
