/*
 * @Author: zhixiong.fu
 * @Date: 2021-02-03 22:19:47
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-02-03 22:24:19
 */
'use strict';
const baseModel = require('../utils/base-model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { INTEGER, DATE, STRING, BIGINT } = Sequelize;
    await queryInterface.createTable(
      'mobile_phone',
      {
        // base
        ...baseModel,
        // 型号
        model_name: { type: STRING(50), comment: '型号' },
        // 尺寸
        size: { type: STRING(50), comment: '尺寸' },
        // 规格
        spec: { type: STRING(50), comment: '规格' },
        // 内存
        ram: { type: INTEGER, comment: '内存' },
        // 空间
        rom: { type: INTEGER, comment: '空间' },
        // 序列号
        seria_number: { type: STRING(50), comment: '序列号' }
      },
      {
        comment: '手机表'
      }
    );
  },

  down: async (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('mobile_phone');
  }
};
