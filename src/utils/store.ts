export default new (class {
  get(key: string) {
    return JSON.parse(localStorage.getItem(key)!)?.payload
  }

  set(key: string, payload: any) {
    const data = { payload, timestamp: Date.now() }
    localStorage.setItem(key, JSON.stringify(data))
  }

  remove(key: string) {
    localStorage.removeItem(key)
  }
})()
