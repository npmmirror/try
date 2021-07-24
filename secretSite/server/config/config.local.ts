import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 33306,
    database: 'test',
    username: 'root',
    password: '123456',
  };

  config.security = {
    csrf: false,
  };

  return config;
};
