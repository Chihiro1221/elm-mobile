import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import setupPlugins from '@/plugins'
import '@/styles/index.scss'
import autoRegisterDirective from './directives'

async function bootstrap() {
  const app = createApp(App)
  setupPlugins(app)
  autoRegisterDirective(app)
  setupRouter(app)
  await router.isReady()
  app.mount('#app')
}

bootstrap()
