import request from '@/utils/request'
import {UserListData, UserType} from '@/pages/system/user-management/data'

/**
 * 获取用户列表
 * @param params
 * @param options
 */
export async function getUserList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<{
    data: UserListData
  }>('/users/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  })
}

/**
 * 删除用户
 * @param id
 */
export async function delUser(id: number) {
  return request(`/users/${id}`, {
    method: 'DELETE'
  })
}

/**
 * 新增用户
 * @param params
 */
export async function createUser(params: UserType) {
  return request('/users', {
    method: 'POST',
    data: params
  })
}

/**
 * 修改用户
 * @param params
 */
export async function updateUser(params: UserType) {
  return request(`/users/${params.id}`, {
    method: 'PATCH',
    data: params
  })
}
