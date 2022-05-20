import http from '@/plugins/axios'
import { ResultResponse } from 'types/resultResponse'

interface Limit_map {
  restaurant_flavor_ids: string
}

export interface Envelope {
  id: number
  sn: string
  user_id: number
  amount: number
  sum_condition: number
  name: string
  phone: string
  begin_date: string
  end_date: string
  status: number
  present_status: number
  share_status: number
  limit_map: Limit_map
  description_map: Descriptionmap
  __v: number
}

interface Descriptionmap {
  phone: string
  online_paid_only: string
  validity_delta: string
  validity_periods: string
  sum_condition: string
}

export interface EnvelpoeForm {
  exchange_code: string
  captcha_code: string
}

/**
 * 获取有效红包
 * @param id
 */
export const getValidEnvelope = (id: number) => {
  return http.request<Envelope[]>({
    url: `promotion/v2/users/${id}/hongbaos?limit=20&offset=0`
  })
}

/**
 * 兑换红包
 * @param id
 * @param data
 */
export const exchangeEnvelope = (id: number, data: EnvelpoeForm) => {
  return http.request<ResultResponse>({
    url: `v1/users/${id}/hongbao/exchange`,
    method: 'POST',
    data
  })
}

/**
 * 获取过期红包
 * @param id
 */
export const getExpireEnvelope = (id: number) => {
  return http.request<Envelope[]>({
    url: `promotion/v2/users/${id}/expired_hongbaos?limit=20&offset=0`
  })
}
