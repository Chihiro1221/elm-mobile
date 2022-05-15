import { App } from 'vue'
import {
  Button,
  Cell, Divider,
  Empty,
  Field,
  Icon,
  Loading,
  NavBar, Overlay,
  Rate,
  Swipe,
  SwipeItem,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs
} from 'vant'

const components = [
  NavBar,
  Cell,
  Icon,
  Loading,
  Field,
  Button,
  Empty,
  Swipe,
  SwipeItem,
  Rate,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Overlay,
  Divider
]
export default function setupVant(app: App) {
  components.forEach(component => app.use(component))
}
