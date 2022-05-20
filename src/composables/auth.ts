import { reactive, ref } from 'vue'
import { getCaptcha } from '@/apis/authApi'
import { FieldRule } from 'vant'

export default new (class {
  public rules = reactive<Record<string, FieldRule[]>>({
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }],
    code: [
      { required: true, message: '请输入验证码' },
      { pattern: /^\d{4}$/, message: '请输入4位数字' },
    ],
  })
  public captcha = ref('')

  public async initCaptcha() {
    const { code } = await getCaptcha()
    this.captcha.value = code
  }
})()
