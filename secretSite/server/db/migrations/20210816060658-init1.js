/**
 * @type {import('../../typings').migration}
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;
    await queryInterface.createTable('hello', {
      aaa: { type: Sequelize.TINYINT({ length: 4 }), defaultValue: 1, comment: '雷猴' },
      info: { type: DataTypes.JSON, defaultValue: {}, comment: '信息' },
    });

    // const { DataTypes } = Sequelize
    // return Promise.all([
    //   queryInterface.addColumn(table('Plan'), field('receiveStatus'), {
    //     type: DataTypes.TINYINT(4), defaultValue: 1, comment: '接收状态(1:未接收,2:已接收,3:申报中,4:退回,通过)'
    //   }),
    //
    //   queryInterface.addColumn(table('Plan'), field('flow'), {
    //     type: DataTypes.JSON, defaultValue: {}, comment: '流程信息'
    //   })
    //
    // ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('hello');
  },
};
