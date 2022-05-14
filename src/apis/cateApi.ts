import http from '@/plugins/axios'
export interface ICate {
  description: string
  icon_url: string
  id: number
  image_url: string
  is_in_serving: boolean
  link: string
  title: string
  title_color: string
  __v: number
}
export const getGoodCate = () => {
  return http.request<ICate[]>({
    url: 'v2/index_entry',
  })
}
