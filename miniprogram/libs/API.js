/**
 * 此文件管理项目所有接口
 */
import {
  get,
  getMap,
  post,
  postMap,
  postOther,
  put,
  del
} from './network';

/**
 * 获取用户信息
 */
export const getUserInfo = (parameter, isShowLoading) => getMap('api/customer/qryCustomer/', parameter, isShowLoading);

/**
 * 获取兴趣
 */
export const getIntersetInfo = (parameter, isShowLoading) => getMap('api/hobbies/qryHobbiesList', parameter, isShowLoading);

/**
 * 注册接口
 */
export const registerUnserInfo = (data, isShowLoading) => post('api/hobbies/saveCustHobbies', data, isShowLoading);

/**
 * 注册接口
 */
export const registerUnserInfo2 = (data, isShowLoading) => post('api/customer/insertCustomer', data, isShowLoading);

/**
 * 修改用户信息接口
 */
export const updateUserInfo = (data, isShowLoading) => post('api/customer/updateCustomer', data, isShowLoading);

/**
 * 查询推荐
 */
export const qryProdictRend = (parameter, isShowLoading) => getMap('api/product/qryProdictRend', parameter, isShowLoading);

/**
 * 查询商品
 */
export const queryProductPage = (parameter, isShowLoading) => getMap('api/product/queryProductPage', parameter, isShowLoading);

/**
 * 新增订单
 */
export const insterOrder = (data, isShowLoading) => post('api/order/insterOrder', data, isShowLoading);

/**
 * 获取订单状态
 */
export const queryorder = (parameter, isShowLoading) => getMap('api/order/queryorder', parameter, isShowLoading);

/**
 * 获取产品信息
 */
export const qryProductById = (parameter, isShowLoading) => getMap('api/product/qryProductById/', parameter, isShowLoading);

/**
 * 修改意愿
 */
export const upEditStatus = (parameter, isShowLoading) => getMap('api/order/upEditStatus/', parameter, isShowLoading);

/**
 * 获取个人订单状态
 */
export const qryCustomerOrder = (parameter, isShowLoading) => getMap('api/customer/qryCustomerOrder', parameter, isShowLoading);

/**
 * 发送验证码
 */
export const sendEleMemValidateCode = (parameter, isShowLoading) => getMap('api/hr/sms/sendEleMemValidateCode', parameter, isShowLoading);

/**
 * 验证验证码
 */
export const smsCodeValidate = (parameter, isShowLoading) => getMap('api/hr/sms/smsCodeValidate', parameter, isShowLoading);

/**
 * 获取社区信息
 */
export const getAddressList = (parameter, isShowLoading) => getMap('api/position/qryfhuaPage', parameter, isShowLoading);

/**
 * 芳华榜报名接口
 */
export const saveFhua = (data, isShowLoading) => post('api/fhua/saveFhua', data, isShowLoading);

/**
 * 芳华榜查询接口
 */
export const qryfhuaPage = (parameter, isShowLoading) => getMap('api/fhua/qryfhuaPage', parameter, isShowLoading);

/**
 * 查询当前用户拥有的票
 */
export const queryVoteCoupon = (parameter, isShowLoading) => getMap('api/fhua/queryVoteCoupon', parameter, isShowLoading);

/**
 * 投票接口
 */
export const voteCoupon = (data, isShowLoading) => post('api/fhua/voteCoupon', data, isShowLoading);

/**
 * 查询我的芳华榜
 */
export const queryFhuaByOpenId = (parameter, isShowLoading) => getMap('api/fhua/queryFhuaByOpenId', parameter, isShowLoading);

/**
 * 修改芳华作品接口
 */
export const updateFhuaById = (data, isShowLoading) => post('api/fhua/updateFhuaById', data, isShowLoading);

/**
 * 查询芳华作品接口根据
 */
export const queryFhuaById = (parameter, isShowLoading) => getMap('api/fhua/queryFhuaById/', parameter, isShowLoading);

/**
 * 查询评论接口
 */
export const qryFhuaDisPage = (parameter, isShowLoading) => getMap('api/fhuaDis/qryFhuaDisPage', parameter, isShowLoading);

/**
 * 评论接口
 */
export const saveFhuaDis = (data, isShowLoading) => post('api/fhuaDis/saveFhuaDis', data, isShowLoading);

/**
 * 评论点赞接口
 */
export const saveFhuaDisPraise = (data, isShowLoading) => post('api/fhuaDis/saveFhuaDisPraise', data, isShowLoading);

/**
 * 查询奖励接口
 */
export const queryPrizeItemAPIPage = (parameter, isShowLoading) => getMap('api/prizeItem/queryPrizeItemAPIPage', parameter, isShowLoading);

/**
 * 查询往期获奖名单
 */
export const queryFhuaSignApp = (parameter, isShowLoading) => getMap('api/fhua/queryFhuaSignApp', parameter, isShowLoading);