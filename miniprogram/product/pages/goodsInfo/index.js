// miniprogram/product/pages/goodsInfo/index.js
const app = getApp()
var utils = require('../../../libs/util.js');
var Log = require('../../../libs/log.js');
var DataUtl = require('../../../libs/dateUtil.js');
import Notify from '../../../components/notify/notify.js';
import Dialog from '../../../components/dialog/dialog.js';
import {
  insterOrder, //新增订单
  upEditStatus, //修改意愿
} from "../../../libs/API";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight,
    title: '', //标题
    goodsInfo: null, //商品详情
    autoplaySwiper: true, //是否自动切换swiper
    //所有图片的高度  
    imgHeights: ["410"],
    swiperCurrent: 0, //当前下标
    showPartakePopup: false, // 是否显示参与popup
    monthIndex: 0, //当前下标
    userInfo: null, //用户信息
    startDate: null, //旅游开始时间
    showConfirmSignUpPopup: false, //确认报名
    isOrderJump: false, //是否是订单跳转
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (utils.isEmpty(app.globalData.goodsInfo)) {
      app.showToastError("商品状态异常!");
      that.onBack();
      return;
    }

    if (!utils.isEmpty(options.isOrderJump)) {
      that.data.isOrderJump = options.isOrderJump;
    }

    that.data.goodsInfo = JSON.parse(app.globalData.goodsInfo);

    wx.setNavigationBarTitle({
      title: that.data.goodsInfo.stitle,
    })

    that.setData({
      isOrderJump: that.data.isOrderJump,
      goodsInfo: that.data.goodsInfo,
    })
  },

  /**
   * 检查用户信息是否符合购买
   */
  checkUserInfo: function() {
    var that = this;
    if (utils.isEmpty(that.data.userInfo.phoneNumber) || utils.isEmpty(that.data.userInfo.customerName)) {
      Dialog.confirm({
        message: "您的基本资料不完整可能导致慢漫不能妥善地为您提供服务，请先补充一下个人信息吧。",
        confirmButtonText: '去完善',
        cancelButtonText: '再想想',
      }).then(() => {
        wx.navigateTo({
          url: 'teamo../userInfo/index?isAutoBack=true',
        })
      }).catch(() => {
        // on cancel
      });
      return;
    } else {
      if (that.data.goodsInfo.isActivity == '0') {
        that.confirmSignUp();
      } else {
        that.showPartakePopup();
      }
    }
  },

  /**
   * 显示参与对话框
   */
  showPartakePopup: function() {
    var that = this;

    that.setData({
      showPartakePopup: true,
    })
    that.setCalendarStatus(that.data.goodsInfo.activityStartDate);
  },

  /**
   * 票数变动监听
   */
  onTicketChangeListener: function(e) {
    var that = this;
    var ticketCount = e.detail.value;

    if (ticketCount) {
      that.data.goodsInfo.ticketCount = ticketCount;
      that.data.goodsInfo.buyPrice = utils.numberMultiply(ticketCount, that.data.goodsInfo.singlyTickerPrice, 2)

      that.setData({
        goodsInfo: that.data.goodsInfo
      })
    }
  },

  /**
   * 切换tab的监听
   */
  onTabChange: function(e) {
    var that = this;
    var currentIndex = e.detail.index;
    var selectDate = that.data.goodsInfo.monthArr[currentIndex];
    that.setCalendarStatus(selectDate.date);
  },

  /**
   * 设置日历显示参数
   */
  setCalendarStatus: function(dataStr) {
    var that = this;
    let calendarInfo = that.selectComponent('#calendar')

    var value = [];
    if (that.data.goodsInfo.isLockTime == "1") {
      value = [that.data.goodsInfo.activityStartDate, that.data.goodsInfo.activityEndDate];
    }

    calendarInfo.open({
      value: value,
      selectValue: [dataStr],
      toolbar: false, //是否显示工具栏
      dayNames: ['日', '一', '二', '三', '四', '五', '六'], //周名称
      dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'], //周名称缩写
      minDate: that.data.goodsInfo.activityStartDate, //最小可选日期
      maxDate: that.data.goodsInfo.activityEndDate, //最小可选日期
      firstDay: 0, //一周的第一日
      multiple: true, //是否支持多选
      dayCycle: that.data.goodsInfo.cycle, //周期
      onChange: (values, displayValues) => {
        that.data.startDate = displayValues[0];
      },
      onMonthYearChangeEnd: (currentYear, currentMonth) => { //月份变化完成的回调函数
        ++currentMonth;
        var currentItemStr = currentYear + "-" + (currentMonth < 10 ? ("0" + currentMonth) : currentMonth);
        var selectMonthIndex = 0;
        for (var i = 0; i < that.data.goodsInfo.monthArr.length; i++) {
          var item = that.data.goodsInfo.monthArr[i];
          if (item.year == currentItemStr) {
            selectMonthIndex = i;
          }
        }
        that.setData({
          monthIndex: selectMonthIndex
        })
      },
    })
  },

  /**
   * 关闭参与对话框
   */
  confirmSignUp: function() {
    var that = this;

    if (that.data.goodsInfo.isActivity == '1') {
      //判断时间是否输入
      if (utils.isEmpty(that.data.startDate)) {
        app.showToastError("请先确认旅出发日期!");
        return;
      }
    }

    var queryOrderData = {};
    queryOrderData.openId = app.globalData.openId;
    queryOrderData.productId = that.data.goodsInfo.id;
    queryOrderData.count = that.data.goodsInfo.ticketCount;
    queryOrderData.phoneNumber = that.data.userInfo.phoneNumber;
    if (that.data.goodsInfo.isActivity == '1') {
      queryOrderData.startDate = that.data.startDate;
    }
    queryOrderData.orderPrice = that.data.goodsInfo.buyPrice;

    insterOrder(queryOrderData, true)
      .then(result => {
        if (result.resCode == "00000") {
          if (that.data.goodsInfo.isActivity == '1') {
            app.showToastSuccess("报名成功!")
          } else {
            app.showToastSuccess("提交成功!")
          }
          that.data.goodsInfo.isSignUp = true;
          that.data.goodsInfo.orderId = result.data;
          that.setData({
            showConfirmSignUpPopup: true,
            goodsInfo: that.data.goodsInfo,
          })
        } else {
          app.showToastError(result.resInfo)
        }
      }).catch(e => {
        if (!utils.isEmpty(e.errMsg)) {
          app.showToastError(e.errMsg)
        }
      })

    that.onPartakePopupClose();
  },

  /**
   * 关闭参与对话框
   */
  onPartakePopupClose: function() {
    var that = this;
    that.setData({
      showPartakePopup: false,
    })
  },

  /**
   * 确认参与对话框
   */
  onSignupPopupClose: function() {
    var that = this;
    that.setData({
      showConfirmSignUpPopup: false,
    })
  },

  /**
   * 图片加载高度
   */
  imageLoad: function(e) { //获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgHeights = this.data.imgHeights;
    //把每一张图片的对应的高度记录到数组里  
    imgHeights[e.target.dataset.id] = imgheight;
    this.setData({
      imgHeights: imgHeights
    })
  },


  onSwiperChangeListener: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  /**
   * 返回上一个页面
   */
  onBack: function() {
    var that = this;
    if (that.data.showPartakePopup) {
      that.setData({
        showPartakePopup: false,
      })
      return;
    }

    wx.navigateBack({
      delta: 1
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
    var that = this;
    that.setData({
      autoplaySwiper: true,
      userInfo: app.globalData.userInfo,
    })
  },

  onSignUpHint: function() {
    var that = this;
    var tempStr;
    if (that.data.goodsInfo.isActivity == "1") {
      tempStr = "参与";
    } else {
      tempStr = "购买";
    }

    Dialog.confirm({
      message: "如果您需要修改关于【" + that.data.goodsInfo.stitle + "】的" + tempStr + "意愿，点击“修改意愿”按钮，稍后将有客服小漫与您联系，为您尽心安排!",
      confirmButtonText: '修改意愿',
      cancelButtonText: '再想想',
    }).then(() => {

      if (!utils.isEmpty(that.data.goodsInfo.orderId)) {
        var url = that.data.goodsInfo.orderId;
        upEditStatus(url, true)
          .then(result => {
            if (result.resCode == "00000") {
              app.showToastSuccess("提交成功!")
            } else {
              app.showToastError(result.resInfo)
            }
          }).catch(e => {
            if (!utils.isEmpty(e.errMsg)) {
              app.showToastError(e.errMsg)
            }
          })
      }
    }).catch(() => {
      // on cancel
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      autoplaySwiper: false,
    })
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
    // 来自页面内转发按钮
    var shearTitle;
    if (that.data.goodsInfo.isActivity == '1') {
      if (that.data.goodsInfo.classType == 0) {
        //小聚
        shearTitle = "去【" + that.data.goodsInfo.stitle + "】见见大家，来不来得及?"
      } else if (that.data.goodsInfo.classType == 1) {
        //出游
        shearTitle = "去【" + that.data.goodsInfo.stitle + "】躲躲清静，来不来得及?"
      } else if (that.data.goodsInfo.classType == 2) {
        //短居
        shearTitle = "去【" + that.data.goodsInfo.stitle + "】走走看看，来不来得及？"
      }
    } else {
      shearTitle = "【" + that.data.goodsInfo.stitle + "】也许你也会喜欢";
    }
    return {
      title: shearTitle,
      path: '/pages/shareGoodsInfo/shareGoodsInfo?goodsId=' + that.data.goodsInfo.id + "&title=" + that.data.goodsInfo.stitle,
      imageUrl: that.data.goodsInfo.recommendImageUrl
    }
  }
})