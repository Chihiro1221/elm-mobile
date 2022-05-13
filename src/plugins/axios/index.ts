import Axios from './Axios'

const http = new Axios({
  baseURL: import.meta.env.VITE_DEV_URL,
  timeout: 10000
})

export default http