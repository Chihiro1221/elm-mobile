import http from '@/plugins/axios'

export interface UploadResult {
  image_path: string
  status: number
}

/**
 * 上传图片
 * @param file
 * @param id
 */
export const uploadAvatar = (file: File, id: number) => {
  if (!id) return Promise.reject('id不能为空')
  const formData = new FormData()
  formData.append('file', file)
  return http.request<UploadResult>({
    url: `eus/v1/users/${id}/avatar`,
    method: 'POST',
    data: formData
  })
}