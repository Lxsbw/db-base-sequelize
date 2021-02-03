/*
 * @Author: zhixiong.fu
 * @Date: 2021-02-04 00:38:29
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-02-04 00:40:16
 */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('mobile_phone', 'color', {
          transaction: t
        })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
