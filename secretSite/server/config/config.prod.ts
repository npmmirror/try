import { EggAppConfig, PowerPartial } from 'egg';
import { URL } from 'url';

const mysqlUrl = new URL(process.env.MYSQL || 'mysql://root:123456@127.0.0.1:3306/test');

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.sequelize = {
    dialect: 'mysql',
    host: mysqlUrl.hostname,
    port: +mysqlUrl.port,
    database: mysqlUrl.pathname.slice(1),
    username: mysqlUrl.username,
    password: mysqlUrl.password,
  };

  return config;
};
