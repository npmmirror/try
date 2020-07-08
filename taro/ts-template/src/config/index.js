import Taro from '@tarojs/taro';

const systemInfo = Taro.getSystemInfoSync();
const isDevelopment = process.env.NODE_ENV === 'development' && systemInfo.platform === 'devtools';
const API_URL = isDevelopment ? 'http://127.0.0.1:7001' : 'http://127.0.0.1:7001';

const configMap = {
  development: {
    log_level: 'debug',
    api: 'https://api.co2.d.yilisafe.com',
    web: 'https://www.co2.d.yilisafe.com',
    logapi: 'https://wyb.cn-shenzhen.log.aliyuncs.com/logstores/dev/track?APIVersion=0.6.0'
  },
  production: {
    log_level: 'warn',
    api: 'https://api-co2.p.yilisafe.com',
    web: 'https://www-co2.p.yilisafe.com',
    logapi: 'https://wyb.cn-shenzhen.log.aliyuncs.com/logstores/prod/track?APIVersion=0.6.0'
  }
}

const defaultConfig = {
  modules: {
    sso: {},
    passport: {},
    login: {}
  },
  API_URL,
}

let env = process.env.NODE_ENV || 'development'
const config =
{
  env,
  ...defaultConfig,
  ...(configMap[env] || configMap['development'])
}

export default config;
