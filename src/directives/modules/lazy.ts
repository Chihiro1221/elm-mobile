import { Directive } from 'vue'

export default {
  created(el) {
    el.src = '/images/loading.gif'
  },
  mounted(el: HTMLImageElement & { intersection: IntersectionObserver }, binding) {
    el.intersection = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        el.src = binding.value
        el.onerror = () => {
          el.src = '/images/onError.webp'
        }
      }
    })
    el.intersection.observe(el)
  },
  beforeUnmount(el) {
    el.intersection.unobserve(el)
  },
} as Directive<any, any>
