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
