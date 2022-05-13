import { App } from 'vue'
import setupTailwindCss from '@/plugins/tailwindcss'

export default function setupPlugins(app: App) {
  setupTailwindCss()
}