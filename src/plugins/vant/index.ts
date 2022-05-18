import { App } from 'vue'
import {
  Button,
  Cell,
  Checkbox,
  Divider,
  Empty,
  Field,
  Icon,
  Loading,
  NavBar,
  Overlay,
  Radio,
  Rate,
  Swipe,
  SwipeItem,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  Form,
  CellGroup, Toast, Uploader, SwipeCell
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
  Divider,
  Checkbox,
  Form,
  CellGroup,
  Uploader,
  SwipeCell
]
export default function setupVant(app: App) {
  components.forEach(component => app.use(component))
}
