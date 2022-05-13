import { RouteLocationNormalized, Router } from 'vue-router'
import locationStore from '@/store/loaction'

export default class Guard {
  private router: Router
  constructor(router: Router) {
    this.router = router
    this.setupGuard()
  }

  private setupGuard() {
    this.router.beforeEach(this.beforeEach.bind(this))
  }

  private beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    if (!locationStore().location && to.path !== '/location' && to.name !== 'city') {
      return '/location'
    }
  }
}
