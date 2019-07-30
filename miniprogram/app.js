//app.js
import Notify from './components/notify/notify.js';

App({

  globalData: {
    navHeight: 0, //导航栏高度
    isDebug: true,
    showLog: true,
    // debugPath: 'https://maam.time2drive.cn/',
    debugPath: 'http://114.115.160.56:9998/',
    releasePath: 'https://mina.maamaam.cn/',
    imagePath: 'https://mina.maamaam.cn/',
    screenWidth: 0, //屏幕宽度
    screenHeight: 0, //屏幕高度
    windowHeight: 0, //填充内容高度
    statusBarHeight: 0, //statusBar高度
    openId: null, //用户openId
    userInfo: null, //用户信息
    goodsInfo: null, //被选中的商品详情
    fHuaInfo: null, //当前自己芳华榜对象
    sysDate: null, //服务器时间
    productId: null, //奖励商品id
  },

  onLaunch: function () {
    var that = this;

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'debug-5ed21e',
        traceUser: true,
      })
    }

    // 获取手机系统信息
    wx.getSystemInfo({
      success: res => {
        //导航高度
        var menuHeight = wx.getMenuButtonBoundingClientRect().height;
        that.globalData.statusBarHeight = res.statusBarHeight;
        var platform = wx.getSystemInfoSync().platform;
        let totalTopHeight = 68
        if (res.model.indexOf('iPhone X') !== -1) {
          totalTopHeight = 88
        } else if (res.model.indexOf('iPhone') !== -1) {
          totalTopHeight = 64
        }
        that.globalData.navHeight = res.statusBarHeight + 46;
        that.globalData.screenWidth = res.screenWidth;
        that.globalData.screenHeight = res.screenHeight;
        that.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        if (that.globalData.showLog) {
          console.error(err)
        }
      }
    })
  },

  /**
   *  获取用户openid
   */
  getOpenid: function () {
    var that = this;
    return new Promise(function (result) {
      wx.cloud.callFunction({
        name: 'login',
        complete: res => {
          res.result.openid = "";
          if (that.globalData.showLog) {
            console.info("当前用户openId:", res.result.openid)
          }
          that.globalData.openId = res.result.openid;
          result(res.result.openid);
        }
      })
    })
  },

  /**
   * 显示success日志
   */
  showToastSuccess: function (message) {
    Notify({
      text: message,
      duration: 3000,
      selector: '#notify',
      backgroundColor: '#56D176'
    });
  },

  /**
   * 显示错误日志
   */
  showToastError: function (message) {
    Notify({
      text: message,
      duration: 3000,
      selector: '#notify',
      backgroundColor: '#F24439'
    });
  },

  /**
   * 改变NavigationBar颜色
   */
  changeNavigationBarColor: function (color) {
    wx.setNavigationBarColor({
      frontColor: color,
      backgroundColor: color,
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
  },

  /**
   * 加载用户信息
   */
  loadUserInfo: function () {
    var that = this;
    var url = that.globalData.openId;
    getUserInfo(url, false)
      .then(result => {
        if (result.resCode == "00000") {
          if (!utils.isEmpty(result.data)) {
            that.globalData.userInfo = result.data
          }
        } else {
          that.showToastError(result.resInfo)
        }
      }).catch(e => {
        if (!utils.isEmpty(e)) {
          that.showToastError(result.resInfo)
        }
      })
  },
})