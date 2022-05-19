// typings.d.ts or router.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    tabbar?: {
      name: string
      icon: string
      index: number
    },
    animation?: Partial<{
      enter: string
      leave: string
      enterDuration: number
      leaveDuration: number
    }>,
    guest?: boolean
    auth?: boolean
  }
}
