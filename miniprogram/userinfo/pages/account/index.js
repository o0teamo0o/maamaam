// miniprogram/userinfo/pages/account/index.js
const app = getApp()
var utils = require('../../../libs/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: ["1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2",]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.initView();
  },

  /**
   * 初始化视图
   */
  initView: function() {
    var that = this;
    var queryMark1 = wx.createSelectorQuery();
    queryMark1.select(".mark1").boundingClientRect()
    queryMark1.exec(function(res) {
      if (!utils.isEmpty(res)) {
        console.error(res)

        var queryMark2 = wx.createSelectorQuery();
        queryMark2.select(".mark2").boundingClientRect()
        queryMark2.exec(function (result) {
          if (!utils.isEmpty(result)) {
            var listHeight = result[0].top - res[0].bottom - result[0].height;
            that.setData({
              listHeight: listHeight,
            })
          }
        })
      }
    })
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