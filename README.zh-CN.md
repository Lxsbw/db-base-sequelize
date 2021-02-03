# db-base-sequelize

db-base-sequelize

## 1

### migration

```bash 初始化表结构
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

### migration 新脚本

```
# 升级数据库
npm run migrate:up
```

### 版本号管理

1. vX.X.X（产品版本.计划版本.bug 修正 or 细节迭代）
2. 小版本 bug 修正 统统 末尾追加
3. git 上各自在自己的（dev\_姓名简写）分支上完成相关代码编写
4. 需发版时，到 github 中进行 `Pull requests` 请求给管理员进行审批后，自动合并到 dev 分支
5. 提交 git 规则(`v当前版本号 '换行' 提交分支 修改内容备注`)，示例如下

```bash
  v1.1.1
  dev 修改内容备注
```

`注意: 当前版本 v1.1.1`

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
