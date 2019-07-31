//index.js
const app = getApp()
var utils = require('../../libs/util.js');
var DataUtl = require('../../libs/dateUtil.js');
import Notify from '../../components/notify/notify.js';
import Dialog from '../../components/dialog/dialog.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight,
    currentTabIndex: 0,
    listData: null, //芳华榜数组
    integralData: null, //积分任务数组
    tourProductList: [], //活动商品信息数组
    goodsProductList: [], //良品信息数组
    integralExchangeList: [], //积分兑数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 抢红包提醒事件
   */
  onRedDialogClose: function(e) {
    if (e.detail) {

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})