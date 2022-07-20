import request from '@/utils/request'
import {CarBrandType} from '@/pages/system/brand-management/data'

/**
 * 获取品牌列表
 * @param params
 * @param options
 */
export async function getCarBrandList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options: {
    [key: string]: any
  }
) {
  return request('/carBrand', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/**
 * 创建品牌
 * @param params
 */
export function createCarBrand(params: CarBrandType) {
  return request('/carBrand', {
    method: 'POST',
    data: params
  })
}

/**
 * 更新品牌
 * @param params
 */
export function updateCarBrand(params: CarBrandType) {
  return request(`/carBrand/${params.id}`, {
    method: 'PATCH',
    data: params
  })
}

/**
 * 删除品牌
 * @param id
 */
export function delCarBrand(id: number) {
  return request(`/carBrand/${id}`, {
    method: 'DELETE'
  })
}
