<script setup lang="ts">
import { ICity } from '@/apis/cityApi'

const props = defineProps<{
  title: string
  cities: ICity[]
  hot?: boolean
}>()

const emit = defineEmits(['change'])
const gotoCitySelector = (city: ICity) => {
  emit('change', city)
}
</script>

<template>
  <div class="hot-city-container">
    <div class="city">
      <div class="title">{{ title }}</div>
      <div class="city-container">
        <div
          class="name"
          @click="gotoCitySelector(city)"
          :class="{ hot: hot }"
          v-for="city of props.cities"
          :key="city.id"
        >
          {{ city.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hot-city-container {
  @apply border-t-2 pt-2;
  .city {
    @apply bg-white;
    background-clip: content-box;

    .title {
      @apply text-xs p-2 text-gray-600 border-b;
    }

    .city-container {
      @apply flex flex-wrap;
      .name {
        @apply w-1/4 border-r border-r-gray-100 border-b p-2 text-center text-sm overflow-hidden truncate text-gray-500;
        &.hot {
          color: $primary-color;
        }
      }
    }
  }
}
</style>
