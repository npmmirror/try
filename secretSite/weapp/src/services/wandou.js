import { request } from '@/util/util';

/**
 * 获取豌豆直播列表
 * @returns {Promise<*>}
 */
export async function getWandouLiveList() {
  return request('/wandou/getList');
}

export async function getWandouWebsocket(data) {
  return request('/wandou/getWebsocket', {
    data
  });
}
