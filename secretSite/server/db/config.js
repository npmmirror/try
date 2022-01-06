const common = {
  dialect: 'mysql',
  seederStorage: 'sequelize',
  migrationStorageTableName: 'sequelize_meta',
  seederStorageTableName: 'sequelize_data',
};

module.exports = {
  development: {
    username: 'root',
    password: '123456',
    database: 'test',
    host: '127.0.0.1',
    ...common,
  },
  test: {
    username: 'root',
    password: '123456',
    database: 'database_test',
    host: 'mysql123',
    ...common,
  },
  production: {
    username: 'root',
    password: '123456',
    database: 'database_production',
    host: 'mysql123',
    ...common,
  },
};
