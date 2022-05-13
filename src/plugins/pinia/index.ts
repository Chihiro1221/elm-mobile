import { App } from 'vue';
import { createPinia } from 'pinia'
export default function definePinia(app: App) {
    app.use(createPinia())
}