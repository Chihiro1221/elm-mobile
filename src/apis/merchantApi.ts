import locationStore from '@/store/loaction'
import http from '@/plugins/axios'

export interface Comment {
  rated_at: string
  rating_star: number
  rating_text: string
  time_spent_desc: string
  _id: string
  username: string
  tags: any[]
  item_ratings: Itemrating[]
  highlights: any[]
  avatar: string
}

interface Itemrating {
  food_id: number
  food_name: string
  _id: string
  is_valid: number
  image_hash: string
}

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

export interface Category {
  name: string
  description: string
  id: number
  restaurant_id: number
  foods: Food[]
  type: number
  icon_url: string
  is_selected: boolean
  __v: number
}

export interface Food {
  name: string
  image_path: string
  activity: Activity
  restaurant_id: number
  category_id: number
  item_id: number
  tips: string
  _id: string
  specfoods: Specfood[]
  satisfy_rate: number
  satisfy_count: number
  attributes: Attribute[]
  is_essential: boolean
  server_utc: string
  specifications: any[]
  rating_count: number
  month_sales: number
  description: string
  attrs: any[]
  display_times: any[]
  pinyin_name: string
  is_featured: number
  rating: number
}

interface Attribute {
  icon_color: string
  icon_name: string
}

interface Specfood {
  name: string
  item_id: number
  sku_id: number
  food_id: number
  restaurant_id: number
  _id: string
  specs: any[]
  stock: number
  checkout_mode: number
  is_essential: boolean
  recent_popularity: number
  sold_out: boolean
  price: number
  promotion_stock: number
  recent_rating: number
  packing_fee: number
  pinyin_name: string
  original_price: number
}

interface Activity {
  image_text_color: string
  icon_color: string
  image_text: string
}

export interface MerchantQuery {
  latitude: number
  longitude: number
  offset?: number
  limit?: number
  restaurant_category_id?: string
  order_by?: 1 | 2 | 3 | 4 | 5 | 6
  delivery_mode?: number[]
  support_ids?: number[]
  restaurant_category_ids?: number[]
}

const { location } = locationStore()

/**
 * 获取餐厅列表
 * @param query
 */
export const getMerchants = (query: Partial<MerchantQuery> = {}) => {
  query.latitude = location?.latitude
  query.longitude = location?.longitude
  return http.request<IMerchant[]>({
    url: 'shopping/restaurants',
    params: query
  })
}

/**
 * 搜索餐厅
 * @param keyword
 */
export const searchMerchant = (keyword: string) => {
  return http.request<IMerchant[]>({
    url: 'v4/restaurants',
    params: {
      keyword,
      geohash: location?.geohash
    }
  })
}

/**
 * 获取餐厅详情
 * @param id
 */
export const getMerchant = (id: string) => {
  return http.request<IMerchant>({
    url: `shopping/restaurant/${id}`
  })
}

/**
 * 获取商品列表
 * @param id
 */
export const getGoodList = (id: string) => {
  return http.request<Category[]>({
    url: `shopping/v2/menu?restaurant_id=${id}`
  })
}

export const getComments = (id: string) => {
  return http.request<Comment[]>({
    url: `ugc/v2/restaurants/${id}/ratings`
  })
}
