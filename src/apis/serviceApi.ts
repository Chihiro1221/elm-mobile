import http from '@/plugins/axios'

export const getServiceExplains = () => {
  return http.request<Record<string, string>>({
    url: 'v3/profile/explain'
  })
}