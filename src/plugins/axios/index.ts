import Axios from './Axios'

const http = new Axios({
  baseURL: import.meta.env.VITE_DEV_URL,
  timeout: 10000,
  // 携带cookie
  withCredentials: true
})

export default http