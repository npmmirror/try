/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1567349276272_4900';

  // add your middleware config here
  config.middleware = [];

  config.mysql = {
  // 单数据库信息配置
    client: {
    //   // host
    //   host: 'mysql.com',
    //   // 端口号
    //   port: '3306',
    //   // 用户名
    //   user: 'test_user',
    //   // 密码
    //   password: 'test_password',
    //   // 数据库名
    //   database: 'test',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // add your user config here
  const userConfig = {
    // SZYR 接口地址
    szyrHost: 'https://szroot.dlcdmy.cn',
  };

  return {
    ...config,
    ...userConfig,
  };
};
