import Taro from '@tarojs/taro';
import config from '@/config';
import { sessionStorage } from '@/utils/storage';

// 默认过期时长，10分钟
const defaultExpires = 600 * 1000;

interface RequestOptions {
  method?: keyof Taro.request.method;
  data?: any;
  // 是否缓存，默认 false
  cache?: boolean;
  // 有效时长，为 -1 代表不过期
  expires?: number;
  // 发生错误是否自动提示错误，默认 true
  showErrorToast?: boolean;
}

async function request(url: string, options: RequestOptions = {}) {
  const {
    method = 'GET',
    data,
    cache = false,
    expires = defaultExpires,
    showErrorToast = true,
  } = options;
  const cacheKey: string = cache ? `${url}?${JSON.stringify(data)}` : '';
  if (cache) {
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  }
  const res = await Taro.request({
    url: config.API_URL + url,
    method,
    data,
    header: {
      Accept: 'application/json',
    },
  });
  if (res.statusCode !== 200) {
    if (showErrorToast) {
      await Taro.showToast({
        title: '请求失败',
        icon: 'none',
      });
    }
    return Promise.reject(res.data);
  } else {
    if (cache) {
      sessionStorage.setItem(cacheKey, res.data, {
        expires: expires,
      });
    }
  }
  return res.data;
}

export default request;
