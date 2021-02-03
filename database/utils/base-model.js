/*
 * @Author: zhixiong.fu
 * @Date: 2021-02-04 00:29:14
 * @Last Modified by:   zhixiong.fu
 * @Last Modified time: 2021-02-04 00:29:14
 */
const { DATE, STRING } = require('sequelize');

module.exports = {
  // primary Key
  id: { type: STRING(50), primaryKey: true, comment: 'key' },
  // 创建时间
  created_at: { type: DATE, comment: '创建时间' },
  // 更新时间
  updated_at: { type: DATE, comment: '更新时间' },
  // 删除时间
  deleted_at: { type: DATE, comment: '删除时间' }
};
