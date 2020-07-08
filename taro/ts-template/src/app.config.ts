import { Config } from '@tarojs/taro';

const config: Config = {
  pages: ['pages/index/index'],
  subPackages: [
    {
      root: 'pages/bindAccount',
      pages: ['index'],
    },
    {
      root: 'pages/auth',
      pages: ['index', 'agreement'],
    },
    {
      root: 'pages/template',
      pages: ['index'],
    },
    {
      root: 'pages/sample',
      pages: ['index'],
    },
  ],
  preloadRule: {
    'pages/index/index': {
      packages: [],
    },
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于选择地理位置',
    },
  },
  networkTimeout: {
    request: 8000,
    uploadFile: 20000,
  },
};

export default config;
