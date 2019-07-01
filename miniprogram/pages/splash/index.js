// miniprogram/pages/splash/index.js
const app = getApp()
var utils = require('../../libs/util.js');
import Notify from '../../components/notify/notify.js';
import {
  getUserInfo, //获取用户信息
} from "../../libs/API";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: null, //用户openId
    isShare: false, //是否是分享跳转过来
    isFHuaShare: false, //是否是芳华榜分享跳转过来的
  },

  /**
   * 生命周期函数--监听页面加载idNumber
   */
  onLoad: function(options) {
    var that = this;

    if (!utils.isEmpty(options.isShare)) {
      that.data.isShare = options.isShare;
    }

    if (!utils.isEmpty(options.isFHuaShare)) {
      that.data.isFHuaShare = options.isFHuaShare;
    }

    app.changeNavigationBarColor("#ffffff");
    if (utils.isEmpty(app.globalData.openId)) {
      if (wx.cloud) {
        app.getOpenid().then(function(res) {
          that.data.openId = res;
          that.loadUserInfo();
        })
      } else {
        app.showToastError("您当前微信版本过低,请先升级微信版本!")
      }
    } else {
      that.data.openId = app.globalData.openId;
      that.loadUserInfo();
    }
  },

  /**
   * 加载用户信息
   */
  loadUserInfo: function() {
    var that = this;
    var url = that.data.openId;
    getUserInfo(url, false)
      .then(result => {

        var loadingTime = 2000;
        // var loadingTime = 0;

        if (that.data.isShare) {
          loadingTime = 0;
        }
        if (that.data.isFHuaShare) {
          loadingTime = 0;
        }

        if (result.resCode == "00000") {
          if (utils.isEmpty(result.data)) {
            setTimeout(function() {
              wx.reLaunch({
                url: '../interest/interest?isBack=true',
              })
            }, loadingTime);
          } else {
            //处理电话号码
            if (result.data.phoneNumber) {
              result.data.formatPhoneNumber = utils.phoneFormat(result.data.phoneNumber)
            }
            //处理年龄
            if (result.data.birthday) {
              result.data.age = utils.getAge(result.data.sysDate, result.data.birthday);
            }
            //处理身份证
            if (result.data.idNumber) {
              result.data.idNumberStr = utils.formatidcard(result.data.idNumber);
            }
            app.globalData.userInfo = result.data;
            app.globalData.sysDate = result.data.sysDate;

            setTimeout(function() {
              if (that.data.isFHuaShare) {
                wx.reLaunch({
                  url: '../index/index?isFHuaShare=true',
                })
              } else {
                wx.reLaunch({
                  url: '../index/index',
                })
              }
            }, loadingTime);
          }
        } else {
          app.showToastError(result.resInfo)
        }
      }).catch(e => {
        if (!utils.isEmpty(e.errMsg)) {
          app.showToastError(e.errMsg)
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
})