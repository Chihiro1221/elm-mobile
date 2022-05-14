import { SearchEnum } from '@/enum/SearchEnum'
import store from '@/utils/store'
import { defineStore } from 'pinia'

export default defineStore('search', {
  state() {
    return {
      history: (store.get(SearchEnum.SEARCH_HISTORY_KEY) || []) as string[],
    }
  },
  actions: {
    initHistroy(payload: string[]) {
      this.history = payload
      store.set(SearchEnum.SEARCH_HISTORY_KEY, this.history)
    },
  },
})
