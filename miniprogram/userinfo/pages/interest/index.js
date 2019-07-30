// miniprogram/userinfo/pages/interest/index.js
const app = getApp()
var utils = require('../../../libs/util.js');
import Notify from '../../../components/notify/notify.js';
//引入图片预加载组件
const ImgLoader = require('../../../components/img-loader/img-loader.js')
import {
  getIntersetInfo, //获取兴趣资料
  registerUnserInfo, //注册用户信息
  getUserInfo, //获取用户信息
} from "../../../libs/API";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight,
    myTopHeight: 0,
    isBack: true, //是否可以返回
    isEdit: false, //是否是修改兴趣
    isShare: false, //是否是分享跳转过来的
    isLoadData: true, //是否加载了数据
    noData: false, //是否没有数据
    isNetError: false, //是否网络错误
    interestArr: null,
    isSubmit: false, //是否可以提交
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //初始化图片预加载组件，并指定统一的加载完成回调
    that.imgLoader = new ImgLoader(that, that.imageOnLoad.bind(that))

    app.changeNavigationBarColor("#ffffff");

    that.initView();

    //判断是否带返回
    if (!utils.isEmpty(options.isBack)) {
      that.setData({
        isBack: options.isBack,
      })
    }

    //判断是否是分享跳转过来的
    if (!utils.isEmpty(options.isShare)) {
      that.setData({
        isShare: options.isShare,
      })
    }

    //判断是否是编辑修改页面跳转过来
    if (!utils.isEmpty(options.isEdit)) {
      that.setData({
        isEdit: options.isEdit,
      })
    }

    that.loadIntersetInfo();

    let bgMusic = wx.getBackgroundAudioManager();
    bgMusic.stop();
    bgMusic.title = "title";
    bgMusic.desc = "desc";
    bgMusic.singer = "singer";
    bgMusic.src = 'http://maam.oss-cn-shenzhen.aliyuncs.com/20190516211914/d2104e44eb8a43158e91d52bcedd71a8-interest_tips.mp3?Expires=1873372756&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=YIJnw2dIEUC%2FTt2pz%2FJRjJqbcjs%3D';
    bgMusic.play();
  },

  /**
   * 加载兴趣数据
   */
  loadIntersetInfo: function () {
    var that = this;

    that.setData({
      isLoadData: true,
      noData: false,
      isNetError: false,
    })

    getIntersetInfo('', false)
      .then(result => {
        that.data.isLoadData = false;
        if (result.resCode == "00000") {
          if (!utils.isEmpty(result.data)) {
            result.data.forEach(function (item) {
              item.isChecked = false;
              that.imgLoader.load(item.imagesUrl)
            })
            that.setData({
              interestArr: result.data
            })
          } else {
            that.data.noData = true;
          }
        } else {
          that.data.isNetError = true;
          app.showToastError(result.resInfo)
        }
        that.setData({
          isLoadData: that.data.isLoadData,
          noData: that.data.noData,
          isNetError: that.data.isNetError,
        })
      }).catch(e => {
        that.setData({
          isLoadData: false,
          noData: false,
          isNetError: true,
        })
        if (!utils.isEmpty(e)) {
          app.showToastError(result.resInfo)
        }
      })
  },

  /**
   * 加载完成后的回调
   */
  imageOnLoad(err, data) {
    var that = this;

    const interestArr = that.data.interestArr.map(item => {
      if (item.imagesUrl == data.src)
        item.loaded = true
      return item
    })
    that.setData({
      interestArr
    })
  },


  /**
   * 获取微信用户信息
   */
  getUserData: function (e) {
    var that = this;
    if (e.detail.userInfo) {

      var wxUserInfo = JSON.parse(e.detail.rawData)

      var queryUserInfoData = {};
      queryUserInfoData.wechatName = wxUserInfo.nickName;
      queryUserInfoData.headImgUrl = wxUserInfo.avatarUrl;
      queryUserInfoData.openId = app.globalData.openId;
      queryUserInfoData.sex = wxUserInfo.gender;
      var ids = [];

      that.data.interestArr.forEach(function (item) {
        if (item.isChecked) {
          ids.push(item.id)
        }
      })
      queryUserInfoData.ids = ids;
      console.error(queryUserInfoData)

      registerUnserInfo(queryUserInfoData, true)
        .then(result => {
          that.data.isLoadData = false;
          if (result.resCode == "00000") {
            that.loadUserInfo();
          } else {
            that.data.isNetError = true;
            app.showToastError(result.resInfo)
          }
          that.setData({
            isLoadData: that.data.isLoadData,
            noData: that.data.noData,
            isNetError: that.data.isNetError,
          })
        }).catch(e => {
          that.setData({
            isLoadData: false,
            noData: false,
            isNetError: true,
          })
          if (!utils.isEmpty(e)) {
            app.showToastError(result.resInfo)
          }
        })
    } else {
      //用户按了拒绝按钮
      if (app.globalData.showLog) {
        console.log("用户拒绝了权限");
      }
    }
  },

  /**
   * 加载用户信息
   */
  loadUserInfo: function () {
    var that = this;
    var url = app.globalData.openId;
    getUserInfo(url, true)
      .then(result => {
        if (result.resCode == "00000") {
          if (utils.isEmpty(result.data)) {
            wx.reLaunch({
              url: './index',
            })
          } else {
            if (result.data.phoneNumber) {
              result.data.formatPhoneNumber = utils.phoneFormat(result.data.phoneNumber)
            }
            app.globalData.userInfo = result.data

            console.error("isShare", that.data.isShare)
            //判断是否是分享跳转古来
            if (that.data.isShare) {
              //判断手机号码是否存在
              if (utils.isEmpty(result.data.phoneNumber) && utils.isEmpty(result.data.customerName)) {
                wx.redirectTo({
                  url: '../userInfo/index?isAutoBack=true',
                })
              } else {
                that.onBack();
              }
            } else {
              wx.reLaunch({
                url: '../../../pages/index/index',
              })
            }
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
   * 点选条目监听
   */
  onCheckedListener: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;

    that.data.isSubmit = false;
    for (var i = 0; i < that.data.interestArr.length; i++) {
      var item = that.data.interestArr[i];
      if (i == index) {
        item.isChecked = !item.isChecked;
      }
      if (item.isChecked) {
        that.data.isSubmit = true;
      }
    }

    that.setData({
      interestArr: that.data.interestArr,
      isSubmit: that.data.isSubmit,
    })
  },

  /**
   * 初始化试图
   */
  initView: function () {
    var that = this;

    wx.getImageInfo({
      src: '../../../images/bg_navigationbar.png',
      success: function (res) {
        var ratio = utils.numberDivision(res.width, app.globalData.screenWidth, 2);
        var myTopHeight = utils.numberDivision(res.height, ratio);
        that.setData({
          myTopHeight: myTopHeight,
        })
      }
    })
  },

  /**
   * 修改兴趣的点击
   */
  onSubmitChange: function () {
    var that = this;
    that.onBack();
  },

  /**
   * 提交兴趣记录
   */
  onInterestSubmit: function (e) {
    var that = this;
    if (!that.data.isSubmit) {
      app.showToastError("请先选择您的兴趣爱好");
    }
  },

  /**
   * 返回上一个页面
   */
  onBack: function () {
    wx.navigateBack({
      delta: 1
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
    //右上角转发菜单
    return {
      title: "精致的休闲生活内容",
      path: '/pages/splash/splash',
      imageUrl: "http://maam.oss-cn-shenzhen.aliyuncs.com/20190509151033/650d6f8e01f94ae989281694147ff740-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190509151004.jpg?Expires=1872745833&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=B4UVmVcwCH2zCjbeSDd%2FQd89HoU%3D"
    }
  }
})