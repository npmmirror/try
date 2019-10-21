import { request } from '../util/util';

/**
 * 获取电影列表
 * @param [limit=10] {number} 条数
 * @returns {Promise<*>}
 */
export async function getVideoList(limit = 8) {
  return request(`/video/getList?limit=${limit}`);
}
