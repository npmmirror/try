import Taro from '@tarojs/taro';

const host = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:7001'
  : 'http://106.53.82.122:7001';

export async function request(url, options = {}) {
  const {
    method = 'GET',
    data
  } = options;
  const res = await Taro.request({
    url: host + url,
    method,
    data,
    header: {
      Accept: 'application/json'
    }
  });
  if (res.statusCode !== 200) {
    await Taro.showToast({
      title: '请求失败',
      icon: 'none'
    });
  }
  return res.data;
}


function formatNumber(n) {
  const strN = n.toString();
  return strN[1] ? strN : `0${strN}`;
}

export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${
    [year, month, day].map(formatNumber)
      .join('/')
  } ${
    [hour, minute, second].map(formatNumber)
      .join(':')
  }`;
}
