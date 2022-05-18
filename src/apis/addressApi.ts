import http from '@/plugins/axios'
import locationStore from '@/store/loaction'

export interface Address {
  id: number;
  address: string;
  phone: string;
  phone_bk: string;
  name: string;
  st_geohash: string;
  address_detail: string;
  tag_type: number;
  user_id: number;
  phone_had_bound: boolean;
  deliver_amount: number;
  agent_fee: number;
  is_deliverable: boolean;
  is_user_default: boolean;
  tag: string;
  city_id: number;
  sex: number;
  poi_type: number;
  created_at: string;
  is_valid: number;
  __v: number;
}

export interface IAddressForm {
  name: string
  address: string
  address_detail: string
  phone: string
  phone_bk: string
}

const location = locationStore()
/**
 * 获取收货地址
 * @param id
 */
export const getAddresses = (id: number) => {
  if (!id) return Promise.reject('请传入用户id')
  return http.request<Address[]>({
    url: `v1/users/${id}/addresses`
  })
}

/**
 * 删除收货地址
 * @param userId 用户id
 * @param addressId 收货地址id
 */
export const removeAddress = (userId: number, addressId: number) => {
  return http.request({
    url: `v1/users/${userId}/addresses/${addressId}`,
    method: 'DELETE'
  })
}

/**
 * 添加收货地址
 * @param id 用户id
 * @param payload
 */
export const addAddress = (id: string, payload: IAddressForm) => {
  return http.request({
    url: `v1/users/${id}/addresses`,
    data: {
      ...payload,
      geohash: location.location?.geohash,
      sex: 1,
      tag: '公司',
      tag_type: 4
    }
  })
}