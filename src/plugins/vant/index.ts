import { App } from 'vue'
import { Button, Cell, Empty, Field, Icon, Loading, NavBar, Rate, Swipe, SwipeItem, Tabbar, TabbarItem } from 'vant'

const components = [NavBar, Cell, Icon, Loading, Field, Button, Empty, Swipe, SwipeItem, Rate, Tabbar, TabbarItem]
export default function setupVant(app: App) {
  components.forEach(component => app.use(component))
}
