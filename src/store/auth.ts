import { defineStore } from 'pinia'
import { getUserProfile, logout, UserProfile } from '@/apis/authApi'
import store from '@/utils/store'
import { AuthEnum } from '@/enum/AuthEnum'

export default defineStore('auth', {
  state() {
    return {
      profile: null as UserProfile | null
    }
  },
  actions: {
    async initUserProfile() {
      const id = store.get(AuthEnum.USER_ID)
      if (id) {
        this.profile = await getUserProfile(id)
      }
    },
    async logout() {
      await logout()
      this.profile = null
      store.remove(AuthEnum.USER_ID)
    }
  }
})