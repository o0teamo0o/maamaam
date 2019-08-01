//index.js
const app = getApp()
var utils = require('../../libs/util.js');
var DataUtl = require('../../libs/dateUtil.js');
import Notify from '../../components/notify/notify.js';
import Dialog from '../../components/dialog/dialog.js';

import {
  queryProductPage, //查询活动及良品商品
} from "../../libs/API";
var pageNo = 1;
var pageSize = 50;

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
    isTourProductNetError: false, //是否活动商品网络异常
    goodsProductList: null, //良品信息数组
    isGoodsProductNetError: false, //是否良品信息网络异常
    integralExchangeList: null, //积分兑数组
    isIntegralExchangeNetError: false, //是否积分兑网络异常
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    that.checkUpload();
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

    that.onLoadRecommendData();
  },


  /**
   * 加载推荐商品列表
   */
  onLoadRecommendData: function() {
    var that = this;
    pageNo = 1;

    var recommendTabIndex = 1;
    if (that.data.currentTabIndex == 0) {
      that.setData({
        isTourProductNetError: false,
      })
      recommendTabIndex = 1;
    } else if (that.data.currentTabIndex == 1) {
      that.setData({
        isGoodsProductNetError: false,
      })
      recommendTabIndex = 0;
    }

    var url = "?pageNo=" + pageNo + "&pageSize=" + pageSize + "&isActivity=" + recommendTabIndex;

    queryProductPage(url, false)
      .then(result => {
        that.data.isLoadData = false;
        if (result.resCode == "00000") {
          if (!utils.isEmpty(result.rows) && result.rows.length > 0) {

            result.rows.forEach(function(item) {

              if (item.stitle == "云梦方舟+紫薇村纯玩一日游") {
                app.globalData.productId = item.id;
              }

              if (!utils.isEmpty(item.stitle)) {
                if (item.classType == 0) {
                  item.title = "小聚";
                } else if (item.classType == 0) {
                  item.title = "短居";
                } else if (item.classType == 0) {
                  item.title = "出游";
                }
                item.bigTitle = item.title;
                item.title = item.title + " / ";
              }
              //处理图片问题
              if (!utils.isEmpty(item.imageUrl)) {
                var imageArr = item.imageUrl.split(";");
                item.bannerRecommendList = [];
                imageArr.forEach(function(imageItem) {
                  if (!utils.isEmpty(imageItem)) {
                    item.bannerRecommendList.push(imageItem);
                  }
                })
                item.recommendImageUrl = imageArr[0];
              }
              //处理详情图片
              if (!utils.isEmpty(item.detailsImageUrl)) {
                var imageArr = item.detailsImageUrl.split(";");
                item.detailRecommendList = [];
                imageArr.forEach(function(imageItem) {
                  if (!utils.isEmpty(imageItem)) {
                    item.detailRecommendList.push(imageItem);
                  }
                })
              }
              item.activityStartDate = DataUtl.getDateMillisecondTransformation(item.activityStartDate);
              item.activityEndDate = DataUtl.getDateMillisecondTransformation(item.activityEndDate);
              item.monthArr = DataUtl.getMonthBetween(item.activityStartDate, item.activityEndDate);
              item.productNumber = utils.numberSub(item.productNumber, item.surplusNumber);
              //初始化购买票数
              if (item.productNumber > 0) {
                item.ticketCount = 1;
              } else {
                item.ticketCount = 0;
              }
              //处理当前购买价格
              if (item.activityAmount) {
                item.buyPrice = item.activityAmount;
                item.singlyTickerPrice = item.activityAmount;
              } else {
                item.buyPrice = item.amount;
                item.singlyTickerPrice = item.amount;
              }
              //处理是否已经报名
              item.isSignUp = false;
              //teamo处理报名逻辑
            })

            //处理排序问题
            var signUpArr = []; //我已报名集合
            var noSignUpArr = []; //没有报名集合
            result.rows.forEach(function(item) {
              if (item.isSignUp) {
                signUpArr.push(item);
              } else {
                noSignUpArr.push(item);
              }
            })

            signUpArr.forEach(function(item) {
              noSignUpArr.splice(0, 0, item)
            })

            if (that.data.currentTabIndex == 0) {
              that.setData({
                tourProductList: noSignUpArr,
              })
            } else {
              that.setData({
                goodsProductList: noSignUpArr,
              })
            }
          } else {
            that.setData({
              goodsProductList: [],
            })
          }
        } else {
          if (that.data.currentTabIndex == 0) {
            that.setData({
              tourProductList: [],
              isTourProductNetError: true,
            })
          } else {
            that.setData({
              goodsProductList: [],
              isGoodsProductNetError: true,
            })
          }
        }
      }).catch(e => {
        if (that.data.currentTabIndex == 0) {
          that.setData({
            tourProductList: [],
            isTourProductNetError: true,
          })
        } else {
          that.setData({
            goodsProductList: [],
            isGoodsProductNetError: true,
          })
        }
        if (!utils.isEmpty(e.errMsg)) {
          app.showToastError(e.errMsg)
        }
      })
  },

  onTabClickListener: function(e) {
    var that = this;

    that.setData({
      currentTabIndex: e.detail.index,
    })

    if (e.detail.index < 2) {
      that.onLoadRecommendData();
    }
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
  onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      var shareInfo = res.target.dataset.data;

      var shearTitle;
      var sharePath;
      var shareImage;
      if (!utils.isEmpty(shareInfo)) {
        if (shareInfo.isActivity == '1') {
          if (shareInfo.classType == 0) {
            //小聚
            shearTitle = "去【" + shareInfo.stitle + "】见见大家，来不来得及?"
          } else if (shareInfo.classType == 1) {
            //出游
            shearTitle = "去【" + shareInfo.stitle + "】躲躲清静，来不来得及?"
          } else if (shareInfo.classType == 2) {
            //短居
            shearTitle = "去【" + shareInfo.stitle + "】走走看看，来不来得及？"
          }
          sharePath = '/pages/shareGoodsInfo/shareGoodsInfo?goodsId=' + shareInfo.id + "&title=" + shareInfo.stitle;
          shareImage = shareInfo.recommendImageUrl;
        } else {
          shearTitle = "【" + shareInfo.stitle + "】也许你也会喜欢";
          shareImage = shareInfo.recommendImageUrl;
        }
      }
      return {
        title: shearTitle,
        path: sharePath,
        imageUrl: shareImage
      }
    } else {
      //右上角转发菜单
      return {
        title: "精致的休闲生活内容",
        path: '/pages/splash/splash',
        imageUrl: "http://maam.oss-cn-shenzhen.aliyuncs.com/20190509151033/650d6f8e01f94ae989281694147ff740-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190509151004.jpg?Expires=1872745833&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=B4UVmVcwCH2zCjbeSDd%2FQd89HoU%3D"
      }
    }
  },

  /**
   * 检查更新
   */
  checkUpload() {
    var that = this;
    var updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
  },
})