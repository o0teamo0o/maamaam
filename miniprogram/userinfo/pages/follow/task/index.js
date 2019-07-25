// miniprogram/userinfo/pages/follow/task/index.js
const app = getApp()
var utils = require('../../../../libs/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    integralData: [{
      "url": "icon_integral_questionnaire.png",
      "title": "【系统】用户爱好兴趣问卷【系统】用户爱好兴趣问卷",
      "star": 3,
    }, {
      "url": "icon_integral_package.png",
      "title": "免费领取限量保险大礼包",
      "star": 2,
    }, {
      "url": "icon_integral_public.png",
      "title": "关注“慢漫陪着你”公众号",
      "star": 2,
    }],
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
    queryMark1.select(".content").boundingClientRect()
    queryMark1.exec(function(res) {
      if (!utils.isEmpty(res)) {
        console.error(res)

        var scrollHeight = wx.getSystemInfoSync().windowHeight;

        var listHeight = scrollHeight - res[0].height;
        that.setData({
          listHeight: listHeight,
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