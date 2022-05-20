import http from '@/plugins/axios'

export const pay = () => {
  return http.request({
    url: 'payapi/payment/queryOrder',
    params: {
      merchantId: '5',
      merchantOrderNo: 'undefined',
      source: 'MOBILE_WAP',
      userId: '71316',
      version: '1.0.0'
    }
  })
}