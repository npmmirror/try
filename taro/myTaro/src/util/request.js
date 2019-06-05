import Taro from '@tarojs/taro';

const host = 'https://www.ufa.hk/mini-app';
// const host = 'http://192.168.1.11:9092/mini-app';
export default function request({ url, data, method = 'GET', header }) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: host + url,
      method,
      header,
      data
    })
      .then(e => {
        const res = e.data;
        if (res.code === '0000') {
          resolve(res.data);
        } else {
          Taro.showToast({
            title: res.msg,
            icon: 'none'
          });
          // reject(res.msg);
        }
      })
      .catch(e => {
        reject(e);
      });
  });
}
