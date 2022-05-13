import { IAddress } from '@/apis/cityApi'
import { LocationEnum } from '@/enum/LocationEnum'
import store from '@/utils/store'
import { defineStore } from 'pinia'

export default defineStore('location', {
  state() {
    return {
      location: store.get(LocationEnum.LOCATION_KEY) as IAddress | null,
      history: store.get(LocationEnum.LOCATION_HISTORY_KEY) as IAddress[] | null,
    }
  },
  actions: {
    initLocation(payload: IAddress) {
      this.location = payload
    },
  },
})
