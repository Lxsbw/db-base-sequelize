# db-base-sequelize

db-base-sequelize

### migration

```初始化表结构
npx sequelize migration:generate --name=init-users
```

```执行 migrate 进行数据库变更
# 升级数据库
npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all
```

### DataBase

- table\column
  全小写，下划线分词
- 主键  
  id（pk 开头 or sequelize 默认）
- 默认字段
  - created_at
  - updated_at
  - deleted_at
- not null
  - 根据业务值进行默认值设置优先推荐的默认值顺序：''>0>-1>特殊定义
  - datetime、date、timestamp：按照业务需要为 null 的情况下，尽量作为辅助字段，不作为优先筛选字段，例如搭配 state 字段
- function  
  全小写下划线分词，[fun_]开头。根据业务复杂程度尽量不要启用自定义函数。
- view  
  全小写下划线分词，[view_]开头。
- 关系  
  [表名_id]
- 常规业务采用三范式原则，交易、金钱、积分相关业务保证数据留痕，以及性能采用反范式。
