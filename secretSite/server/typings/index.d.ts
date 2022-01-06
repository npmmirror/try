import 'egg';
import * as sequelize from 'sequelize';

declare module 'egg' {

}

interface migration {
  up: (queryInterface: sequelize.QueryInterface, sequelize: typeof sequelize) => Promise<void>;
  down: (queryInterface: sequelize.QueryInterface, sequelize: typeof sequelize) => Promise<void>;
}
