import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export default class {
  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.setupInterceptors()
  }

  public request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const res = await this.instance.request<T>(config)
      resolve(res.data)
    })
  }

  private setupInterceptors() {
    this.requestInterceptors()
    this.responseInterceptors()
  }

  private requestInterceptors() {
    this.instance.interceptors.request.use(config => {
      return config
    }, err => {
      return Promise.reject(err)
    })
  }

  private responseInterceptors() {
    this.instance.interceptors.response.use(response => {
      return response
    }, err => {
      return Promise.reject(err)
    })
  }

}