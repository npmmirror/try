import Taro from '@tarojs/taro';

const host = 'http://106.53.82.122:7001';

// const host = 'http://127.0.0.1:7001';

export async function request(url, options = {}) {
  const {
    method = 'GET',
    data
  } = options;
  const res = await Taro.request({
    url: host + url,
    method,
    data
  });
  if (res.statusCode !== 200) {
    await Taro.showToast({
      title: '请求失败',
      icon: 'none'
    });
  }
  return res.data;
}

export const todo = '';
