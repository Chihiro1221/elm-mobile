import http from '@/plugins/axios'

export interface ExchangeForm {
  number: string,
  password: string
}

/**
 * εζ’δΌε
 * @param id
 * @param data
 */
export const exchangeMember = (id: number, data: ExchangeForm) => {
  return http.request({
    url: `member/v1/users/${id}/delivery_card/physical_card/bind`,
    method: 'POST',
    data
  })
}