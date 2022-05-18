import { reactive, ref } from 'vue'
import { getCaptcha } from '@/apis/authApi'

export default new class {
  public rules = reactive({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    code: [
      { required: true, message: '请输入验证码', trigger: 'blur' },
      { pattern: /\d{4}/, message: '请输入4位数字', trigger: 'blur' }
    ]
  })
  public captcha = ref('')

  public async initCaptcha() {
    const { code } = await getCaptcha()
    this.captcha.value = code
  }
}