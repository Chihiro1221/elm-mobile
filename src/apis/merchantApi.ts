import locationStore from '@/store/loaction'
import http from '@/plugins/axios'
export interface IMerchant {
  name: string
  address: string
  id: number
  latitude: number
  longitude: number
  location: number[]
  phone: string
  category: string
  supports: Support[]
  status: number
  recent_order_num: number
  rating_count: number
  rating: number
  promotion_info: string
  piecewise_agent_fee: Piecewiseagentfee
  opening_hours: string[]
  license: License
  is_new: boolean
  is_premium: boolean
  image_path: string
  identification: Identification
  float_minimum_order_amount: number
  float_delivery_fee: number
  distance: string
  order_lead_time: string
  description: string
  delivery_mode: Deliverymode
  activities: any[]
  __v: number
}

interface Deliverymode {
  color: string
  id: number
  is_solid: boolean
  text: string
}

interface Identification {
  registered_number: string
  registered_address: string
  operation_period: string
  licenses_scope: string
  licenses_number: string
  licenses_date: string
  legal_person: string
  identificate_date?: any
  identificate_agency: string
  company_name: string
}

interface License {
  catering_service_license_image: string
  business_license_image: string
}

interface Piecewiseagentfee {
  tips: string
}

interface Support {
  description: string
  icon_color: string
  icon_name: string
  id: number
  name: string
  _id: string
}

const { location } = locationStore()
export const getMerchants = () => {
  return http.request<IMerchant[]>({
    url: 'shopping/restaurants',
    params: {
      latitude: location?.latitude,
      longitude: location?.longitude,
    },
  })
}
