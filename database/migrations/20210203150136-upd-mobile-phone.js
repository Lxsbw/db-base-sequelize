/*
 * @Author: zhixiong.fu
 * @Date: 2021-02-04 00:33:17
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-02-04 00:37:34
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'mobile_phone',
          'color',
          {
            type: STRING(50),
            comment: '外观主体颜色'
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'mobile_phone',
          'seria_number',
          {
            type: STRING(200),
            comment: '序列号（加长）'
          },
          { transaction: t }
        )
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('mobile_phone', 'color', {
          transaction: t
        }),
        queryInterface.removeColumn('mobile_phone', 'seria_number', {
          transaction: t
        })
      ]);
    });
  }
};
