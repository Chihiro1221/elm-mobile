import { App } from 'vue'
export default function autoRegisterDirective(app: App) {
  const modules = import.meta.globEager('./modules/*.ts')
  Object.entries(modules).forEach(([key, module]) => {
    const name = key.split('/').pop()?.split('.').shift()!
    app.directive(name, module.default)
  })
}
