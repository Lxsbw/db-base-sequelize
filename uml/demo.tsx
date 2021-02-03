/*
 * @Author: Justin Xie
 * @Date: 2019-12-4 10:41:10
 * @Last Modified by: Justin Xie
 * @Last Modified time: 2019-12-05 12:08:24
 * 积分交易模块中的表设计和之间的关系
 */

interface Base {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

/**
 * TODO:
 * 事件-类型
 */
enum Event_Type {
  /**
   * 任务,该类型获取得到或者是消耗固定的值
   */
  Task = 1,
  /**
   * 交易,该类型根据传入的金额与折算率进行计算
   */
  Transaction = 2
}
/**
 * 事件-交易方式
 */
enum Event_Operation_Type {
  /**
   * 获取
   */
  Get = 1,
  /**
   * 支付/交易操作
   */
  Pay = 2
}

/**
 * 事件表 event,不能修改只能添加和删除
 */
export interface Event extends Base {
  /**
   * 事件类型
   */
  type: Event_Type;
  /**
   * 事件名称
   */
  name: string[20];
  /**
   * 事件说明
   */
  description: string[100];
  /**
   * 交易方式
   */
  operation_type: Event_Operation_Type;
  /**
   * 两位小数
   * Task => 交易值(数字验证，2位小数)
   * Transaction => 折算率(数字验证，小于100的整数, 百分比)
   */
  rate: number;
  /**
   * Token id
   */
  token_id: string;
  /**
   * application id(可以有多个,暂定用|分开)
   */
  application_id: string;
}

/**
 * 事件 Log 表, 用于统计访问次数和交易总值 Event_Record
 * 交易总值
 * Task => 访问次数 * Event.Value
 * Transaction => SUM(Event.rate * Amout) // amount 调用该事件传入的订单金额参数
 * 只能插入不能修改
 */
// tslint:disable-next-line:class-name
export interface Event_Record extends Base {
  /**
   * 事件 id
   */
  event_id: string;
  /**
   * 事件交易方式[Get 1 获取,Pay 2 支付/交易操作]
   */
  event_operation_type: number;
  /**
   * Token id,便于查看剩余发行的 Token
   */
  token_id: string;
  /**
   * 来源 application id
   */
  application_id: string;
  /**
   * 传入参数
   */
  param_in: JSON;
  /**
   * 传入参数
   */
  param_out: JSON;
  /**
   * 传入的值都是单位为分的整数
   * 交易值,只有在事件类型为 Transaction 的时候用到
   */
  amount: number;
  /**
   * 该事件计算后实际值,保存 => 小数点两位
   * 保存到分,显示单位为元, 小数点四位,不做取整判断
   */
  event_amount: number;
  /**
   * 人民币数量
   */
  event_value: number;
  /**
   * 业务用户在全平台的唯一ID（现阶段存放微信 union_id，与application_id构成组合键，在积分中台相关的生态中唯一）
   */
  we_union_id: string;
  /**
   * 用于本次请求的主键 id, 需要唯一,用于验证是否已执行
   */
  request_id: string;
  /**
   * 用于表示请求组,常见于一整套流程操作, 如生成预支付单=>客户支付=>商户确认
   */
  request_group_id: string;
  /**
   * 事件说明
   */
  description: string[100];
}

enum Token_Type {
  /**
   * 锚定, 是和 RMB 换算价值,相当于发布一个新的 Token
   */
  Anchor = 1,
  /**
   * 通兑, 发布一个 Token 和 FUN氪 进行换算,相当于发布一个新的 Token 且创建和 FUN氪 的兑换关系
   */
  Exchange = 2
}

// 通证表/货币表 Token
export interface Token extends Base {
  /**
   * token Type
   */
  type: Token_Type;
  /**
   * token name, 6 个字
   */
  name: string;
  /**
   * token symbol
   */
  symbol: string;
  /**
   * 是否指定为通兑锚定,全平台只可以指定一个,用于显示在通兑页面上
   * 0 | null | '' => false, 1 => true
   */
  is_global_token: number;
  /**
   * 暂时是 1:1,不做多 Owner
   * 发行方,多个中间使用 | 进行分割, 应该和 BC 中的 sys_user 相匹配
   */
  owner: string;
  /**
   * 相当于多少 RMB
   * Anchor => 前端显示, 前端输入
   * Exchange => 前端不显示, 通过 Rate 进行换算得到的
   */
  value: number;
  /**
   * 小数点两位
   * 在显示的时候,锚定兑率为 1:rate
   * Anchor => 前端不显示, rate = 1, 后台固定值
   * Exchange => 前端显示, 前端输入, 相当于多少 FUN氪(Token 表中唯一一个 is_global_token === 1 的Token)
   */
  rate: number;
  /**
   * 通兑指定的兑换 Token id
   */
  token_id: string;
  /**
   * 发行量,整数
   */
  circulation: number;
  /**
   * 说明
   */
  description: string;
}

enum EUnionIdType {
  /**
   * 微信we_union_id
   */
  WeChat = 10,
  /**
   * facebook账号
   */
  Facebook = 20,
  /**
   * 手机号
   */
  phone = 30,
  /**
   * 身份证号
   */
  IdCard = 40,
  /**
   * 邮箱
   */
  Email = 50,
  /**
   * 业务app_user_id
   */
  BusinessId = 60
}

/**
 * 平台业务用户表
 */
// tslint:disable-next-line:class-name
export interface App_User extends Base {
  /**
   * 用户名
   */
  name: string[50];
  /**
   * 用户真实姓名
   */
  real_name: string[50];
  /**
   * 生日
   */
  birthday: string[50];
  /**
   * 性别 0未知 1男 2女
   */
  gender: number;
  /**
   * 邮箱
   */
  email: string[200];
  /**
   * 身份证号
   */
  id_card: string[50];
  /**
   * 手机号
   */
  phone: string[20];
  /**
   * 区域编码,中国大陆:86; 中国香港:852; 马来西亚:60; 泰国:66
   */
  region_code: string[50];
  /**
   * 来源系统编号
   */
  application_id: string[20];
  /**
   * 微信 OpenId
   */
  we_open_id: string[50];
  /**
   * 业务用户在全平台的唯一ID, 这里先用微信号 TODO:微信接口不能获取微信号
   */
  we_union_id: string[50];
  /**
   * 用于声明 we_union_id 字段来源[WeChat 10 微信we_union_id,Facebook 20 facebook账号,phone 30 手机号,IdCard 40 身份证号,Email 50 邮箱,BusinessId 60 业务app_user_id]
   */
  union_id_type: EUnionIdType;
  /**
   * 描述
   */
  description: string[100];
}

/**
 * 应用管理-终端形态
 */
enum Application_Endpoint_Type {
  App = 1,
  MiniProgram = 2,
  H5 = 3,
  PC = 4,
  Other = 5
}

// 应用管理表  Application
export interface Application extends Base {
  /**
   * token name
   */
  name: string[10];
  /**
   * 运营方
   */
  owner: string[20];
  /**
   * 终端形态
   */
  endpoint_type: Application_Endpoint_Type;
  /**
   * 使用 Token id
   */
  token_id: string;
  /**
   * 事件说明
   */
  description: string[100];
}
