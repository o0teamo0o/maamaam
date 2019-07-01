//获取应用实例
const app = getApp()

/**
 * 加载试图位置信息
 */
function loadViewLocationInfo(selected) {
  console.log(selected)
  var result;
  var queryBottom = wx.createSelectorQuery();
  queryBottom.select(selected).boundingClientRect()
  queryBottom.exec(function(res) {
    result = res;
    return new Promise(function() {
      if (app.globalData.showLog) {
        console.log(res)
      }
      return res;
    })
  })

  return result;
}

module.exports = {
  loadViewLocationInfo: loadViewLocationInfo,
}