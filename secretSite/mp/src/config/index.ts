import Taro from '@tarojs/taro';

const systemInfo = Taro.getSystemInfoSync();
const isDevelopment = process.env.NODE_ENV === 'development' || systemInfo.platform === 'devtools';
const API_URL = isDevelopment ? 'http://127.0.0.1:7001' : 'http://106.53.82.122:7001';
console.log({
  NODE_ENV: process.env.NODE_ENV,
  'systemInfo.platform': systemInfo.platform,
  API_URL,
  isDevelopment,
});
const config = {
  API_URL,
};

export default config;
