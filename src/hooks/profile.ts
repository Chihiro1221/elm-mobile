import { provide, Ref, ref, watchEffect } from 'vue'
import { ProvideKeyEnum } from '@/enum/ProvideKeyEnum'
import { useRoute } from 'vue-router'
import { Dialog } from 'vant'

export interface IInject {
  infoShow: Ref<boolean>
  changeUserNameShow: Ref<boolean>
  addressShow: Ref<boolean>
  addAddressShow: Ref<boolean>
  searchAddressShow: Ref<boolean>
}

export const handleBind = (message: string) => {
  Dialog.confirm({ title: '警告', message, showCancelButton: false })
}

export default function () {
  const route = useRoute()

  const infoShow = ref(false)
  const changeUserNameShow = ref(false)
  const addressShow = ref(false)
  const addAddressShow = ref(false)
  const searchAddressShow = ref(false)
  watchEffect(() => {
    infoShow.value = /^\/profile\/info.*$/.test(route.path)
    changeUserNameShow.value = '/profile/info/change-username' === route.path
    addressShow.value = /^\/profile\/info\/address.*$/.test(route.path)
    addAddressShow.value = '/profile/info/address/add' === route.path
    searchAddressShow.value = '/profile/info/address/search' === route.path
  })
  provide<IInject>(ProvideKeyEnum.PROFILE_KEY, {
    infoShow,
    changeUserNameShow,
    addressShow,
    addAddressShow,
    searchAddressShow,
  })
  return {
    infoShow,
    changeUserNameShow,
    addressShow,
    addAddressShow,
    searchAddressShow,
  }
}
