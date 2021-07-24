// import Taro from '@tarojs/taro';

// const systemInfo = Taro.getSystemInfoSync();
// const isDevelopment = process.env.NODE_ENV === 'development' && systemInfo.platform === 'devtools';
const isDevelopment = false;
const API_URL = isDevelopment ? 'http://127.0.0.1:7001' : 'http://106.53.82.122:7001';
const config = {
  API_URL,
};

export default config;
