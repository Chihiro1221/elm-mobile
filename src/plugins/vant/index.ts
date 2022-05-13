import { App } from 'vue'
import { Button, Cell, Empty, Field, Icon, Loading, NavBar } from 'vant'

const components = [NavBar, Cell, Icon, Loading, Field, Button, Empty]
export default function setupVant(app: App) {
  components.forEach(component => app.use(component))
}
