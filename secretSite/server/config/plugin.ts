import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  redis: {
    enable: true,
    package: 'egg-redis',
  },

  bull: {
    enable: true,
    package: '@hackycy/egg-bull',
  },

  sequelize: {
    package: 'egg-sequelize',
    enable: true,
  },
};

export default plugin;
