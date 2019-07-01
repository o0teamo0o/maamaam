//获取应用实例
const app = getApp()

/**
 * 显示Info日志
 */
function info(msg) {
  if (app.globalData.showLog) {
    console.info(msg);
  }
}


/**
 * 显示Info日志
 */
function infoKey(key, msg) {
  if (app.globalData.showLog) {
    console.info(key, msg);
  }
}
/**
 * 显示Error日志
 */
function error(msg) {
  if (app.globalData.showLog) {
    console.error(msg);
  }
}

/**
 * 显示Error日志
 */
function errorKey(key, msg) {
  if (app.globalData.showLog) {
    console.error(key, msg);
  }
}

module.exports = {
  i: info,
  info: infoKey,
  e: error,
  error: errorKey,
}