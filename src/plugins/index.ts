import { App } from 'vue'
import setupTailwindCss from '@/plugins/tailwindcss'
import setupVant from '@/plugins/vant'
import setupPinia from '@/plugins/pinia'

export default function setupPlugins(app: App) {
  setupTailwindCss()
  setupVant(app)
  setupPinia(app)
}