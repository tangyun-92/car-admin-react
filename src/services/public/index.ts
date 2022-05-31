import request from '@/utils/request'

/**
 * 获取当前用户信息
 * @param options
 */
export async function getUserInfo(options?: Record<string, any>) {
  return request<{
    data: API.CurrentUser
  }>('/users/getUserInfo', {
    method: 'GET',
    ...(options || {}),
  })
}

/**
 * 登录
 * @param body
 * @param options
 */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/users/loginByUsername', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
