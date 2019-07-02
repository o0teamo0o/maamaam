//index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight,
    // listData: null, //榜单数据
    listData: [{}, {}, {}],
    // integralData: null, //积分任务列表
    // integralData: [],
    integralData: [{
      "title": "【系统】用户爱好兴趣问卷",
      "star": 3,
    }, {
      "title": "免费领取限量保险大礼包",
      "star": 2,
    }, {
      "title": "关注“慢漫陪着你”公众号",
      "star": 2,
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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