import http from '@/plugins/axios'

export interface ICity {
  abbr: string
  area_code: string
  id: number
  is_map: boolean
  latitude: number
  longitude: number
  name: string
  pinyin: string
  sort: number
}

export interface IAddress {
  address: string
  geohash: string
  latitude: number
  longitude: number
  name: string
}

export const getCurrentCity = () => {
  return http.request<ICity>({
    url: 'cities',
    params: {
      type: 'guess'
    }
  })
}

export const getHotCities = () => {
  return http.request<ICity[]>({
    url: 'cities',
    params: {
      type: 'hot'
    }
  })
}

export const getCities = () => {
  return http.request<ICity[]>({
    url: 'cities',
    params: {
      type: 'group'
    }
  })
}

export const getCityById = (id: string) => {
  return http.request<ICity>({
    url: `cities/${id}`
  })
}

export const searchCities = (id: number, keyword: string) => {
  return http.request<IAddress[]>({
    url: 'pois',
    params: {
      city_id: id,
      keyword
    }
  })
}