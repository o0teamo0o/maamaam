// miniprogram/userinfo/pages/follow/order/index.js
const app = getApp()
var utils = require('../../../../libs/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tourProductList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.initView();
  },

  /**
   * 初始化视图
   */
  initView: function () {
    var that = this;
    var queryMark1 = wx.createSelectorQuery();
    queryMark1.select("#idMark").boundingClientRect()
    queryMark1.exec(function (res) {
      if (!utils.isEmpty(res)) {
        console.error(res)
        var scrollHeight = wx.getSystemInfoSync().windowHeight;
        console.error(scrollHeight)

        var listHeight = scrollHeight - res[0].bottom;
        that.setData({
          listHeight: listHeight,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})