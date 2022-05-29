import { CartEnum } from './../enum/CartEnum'
import { Food } from '@/apis/merchantApi'
import store from '@/utils/store'
import { defineStore } from 'pinia'
import { Toast } from 'vant'

export interface CartItem {
  id: number
  name: string
  packing_fee: number
  price: number
  quantity: number
  sku_id: number
  specs: string[]
  stock: number
}
export default defineStore('cart', {
  state() {
    return {
      carts: (store.get(CartEnum.CARTS) || {}) as Record<string, CartItem[]>,
    }
  },
  actions: {
    add(item: Food, index: number) {
      const food = item.specfoods[index]
      const data = {
        id: food.item_id,
        name: food.name,
        packing_fee: food.packing_fee,
        price: food.price,
        quantity: 1,
        sku_id: food.sku_id,
        specs: [food.specs?.[0]?.value ?? food.specs_name],
        stock: food.stock,
      }
      if (!this.carts[item.category_id]) {
        this.carts[item.category_id] = [data]
      } else {
        const foods = this.carts[item.category_id]
        const currentFood = foods.find(food => food.id === item.item_id)
        if (currentFood) {
          currentFood.quantity++
          item.specfoods.length !== 1
            ? currentFood.specs.includes(item.specfoods[index].specs[0].value)
              ? null
              : currentFood.specs.push(item.specfoods[index].specs[0].value)
            : null
        } else {
          this.carts[item.category_id].push(data)
        }
      }

      store.set(CartEnum.CARTS, this.carts)
    },
    remove(item: Food) {
      if (item.specfoods.length !== 1) return Toast('多规格商品请到购物车中修改')
      const foods = this.carts[item.category_id]
      const current = foods.find(food => food.id === item.item_id)
      current && this.removeByItem(current)
    },
    removeByItem(item: CartItem) {
      item.quantity--
      if (item.quantity <= 0) {
        Object.entries(this.carts).forEach(([key, value]) => {
          const index = value.findIndex(food => food.id === item.id)
          if (index !== -1) {
            value.splice(index, 1)
          }
        })
      }
      store.set(CartEnum.CARTS, this.carts)
    },
    clear() {
      this.carts = {}
      store.set(CartEnum.CARTS, this.carts)
    },
    isAdded(food: Food) {
      return this.carts[food.category_id]?.find(item => item.id === food.item_id)?.quantity ?? 0
    },
  },

  getters: {
    count(state) {
      return Object.values(state.carts).reduce(
        (count, item) => (count += item.reduce((c, citem) => (c += citem.quantity), 0)),
        0
      )
    },
    totalPrice(state) {
      return Object.values(state.carts).reduce(
        (total, item) => (total += item.reduce((c, citem) => (c += citem.quantity * citem.price), 0)),
        0
      )
    },
    diffPrice() {
      const diff = 20 - this.totalPrice
      return diff > 0 ? diff : false
    },
    originalCarts() {
      const arr: CartItem[] = []
      Object.values(this.carts).forEach(item => arr.push(...item))
      return arr
    },
  },
})
