import { ref } from 'vue'

export default new class {
  public currentAddress = ref('')

  public setCurrentAddress(address: string) {
    this.currentAddress.value = address
  }

  public clearCurrentAddress() {
    this.currentAddress.value = ''
  }
}