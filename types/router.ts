// typings.d.ts or router.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    tabbar?: {
      name: string
      icon: string
    }
  }
}