import { createApp } from 'vue'
import App from './App.vue'
import { Button } from 'vant'
import router from './router'
import setupPlugins from '@/plugins'
import '@/styles/index.scss'
import autoRegisterDirective from './directives'

const app = createApp(App)
setupPlugins(app)
autoRegisterDirective(app)
app.use(Button)
app.use(router)
app.mount('#app')
