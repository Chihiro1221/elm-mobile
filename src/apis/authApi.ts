import http from '@/plugins/axios'

interface Captcha {
  code: string
  status: number
}

export interface ILogin {
  username: string
  password: string
  captcha_code: string
}

export interface IForgetPassword {
  username: string,
  oldpassWord: string
  newpassword: string
  confirmpassword: string
  captcha_code: string
}

interface ColumnDesc {
  game_desc: string
  game_image_hash: string
  game_is_show: number
  game_link: string
  gift_mall_desc: string
}

export interface UserProfile {
  avatar: string
  balance: number
  brand_member_new: number
  city: string
  column_desc: ColumnDesc
  current_address_id: number
  current_invoice_id: number
  delivery_card_expire_days: number
  email: string
  gift_amount: number
  id: number
  is_active: number
  is_email_valid: boolean
  is_mobile_valid: boolean
  mobile: string
  point: number
  registe_time: string
  user_id: number
  username: string
  __v: number
  _id: string
}

export interface LoginReject {
  message: string
  status: number
  type: string
}

export interface ForgetPassword {
  message: string
  status: number
  type?: string
  success?: string
}


/**
 * 获取验证码
 */
export const getCaptcha = () => {
  return http.request<Captcha>(({
    url: 'v1/captchas',
    method: 'POST'
  }))
}

type Login = UserProfile | LoginReject
/**
 * 登录
 */
export const login = (data: ILogin) => {
  return http.request<Login>({
    url: 'v2/login',
    method: 'POST',
    data
  })
}

/**
 * 根据用户id获取用户信息
 * @param id
 */
export const getUserProfile = (id: string) => {
  return http.request<UserProfile>({
    url: `/v1/user/${id}`
  })
}

/**
 * 忘记密码
 * @param data
 */
export const forgetPassword = (data: IForgetPassword) => {
  return http.request<ForgetPassword>({
    url: 'v2/changepassword',
    method: 'POST',
    data
  })
}

/**
 * 退出登录
 */
export const logout = () => {
  return http.request({
    url: 'v2/signout'
  })
}