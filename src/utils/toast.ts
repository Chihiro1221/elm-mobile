import { h } from 'vue'

export default class Toast {
  static warning(message: string) {
    const div = document.createElement('div')
    div.classList.add('toast')
    document.body.appendChild(div)
  }
}