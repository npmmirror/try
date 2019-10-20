import { request } from '../util/util';

/**
 * 获取里番漫画列表
 * @param [limit=9] {number} 条数
 * @returns {Promise<*>}
 */
export async function getComicList(limit = 100) {
  return request(`/comic/getList/?limit=${limit}`);
}
