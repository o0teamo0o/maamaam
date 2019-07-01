/**
 * Created by 23hp on 2018/3/30.
 * 基于Promise的网络请求库,包含GET POST请求，上传下载功能
 * 使用方法：
 * 先引入： import {get,post,...} from 本文件;
 * · get请求:    get("/index",{id:2}).then(data=>{}).catch(error=>{});
 * · post请求:    post("/index",{id:2}).then(data=>{}).catch(error=>{});
 * Promise详细介绍：
 * http://es6.ruanyifeng.com/#docs/promise
 */
//获取应用实例
const app = getApp()

/**
 * 发起get请求
 * @param url 请求路径 必填
 * @param data 请求参数 get请求的参数会自动拼到地址后面
 * @param isShowLoading 是否显示loading加载
 */
export const get = (url, data, isShowLoading) => request('GET', url, data, isShowLoading);

/**
 * 发起get请求
 * @param url 请求路径 必填
 * @param data 请求参数 get请求的参数会自动拼到地址后面
 * @param isShowLoading 是否显示loading加载
 */
export const getMap = (url, parameter, isShowLoading) => requestMap('GET', url, parameter, isShowLoading);

/**
 * 发起post请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头
 */
export const post = (url, data, isShowLoading) => request('POST', url, data, isShowLoading);

/**
 * 发起post请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头l
 */
export const postMap = (url, parameter, isShowLoading) => requestMap('POST', url, parameter, isShowLoading);
/**
 * 发起put请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头
 */
export const put = (url, data, isShowLoading) => request('PUT', url, data, isShowLoading);
/**
 * 发起delete请求
 * @param url 请求路径 必填
 * @param data 请求参数 delete请求的参数会自动拼到地址后面
 */
export const del = (url, data, isShowLoading) => request('DELETE', url, data, isShowLoading);

/**
 * 接口请求基类方法
 * @param method 请求方法 必填
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param header 请求头
 * @returns {Promise}
 */
export function request(method, url, data, isShowLoading = {
  'Content-Type': 'application/json'
}) {
  if (data) {
    data = JSON.stringify(data)
  }
  //区分域名
  if (app.globalData.isDebug) {
    url = app.globalData.debugPath + url;
  } else {
    url = app.globalData.releasePath + url;
  }
  if (isShowLoading) {
    wx.showLoading({
      title: '加载中',
    })
  }
  return new Promise((resolve, reject) => {
    const response = {};
    wx.request({
      url,
      method,
      data,
      success: (res) => response.success = res.data,
      fail: (error) => response.fail = error,
      complete() {
        if (isShowLoading) {
          wx.hideLoading();
        }
        if (app.globalData.showLog) {
          console.info(method, url, data, app.globalData.token);
        }
        if (response.success) {
          if (app.globalData.showLog) {
            console.info('请求成功', response.success);
          }
          if (response.success.status == 500) {
            resolve(response.fail)
          } else {
            resolve(response.success)
          }
        } else {
          if (app.globalData.showLog) {
            console.error('请求失败', response.fail);
          }
          reject(response.fail)
        }
        console.groupEnd();
      },
    });
  });
}

/**
 * 接口请求基类方法
 * @param method 请求方法 必填
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param header 请求头
 * @returns {Promise}
 */
export function requestMap(method, url, parameter, isShowLoading = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}) {
  //区分域名
  if (app.globalData.isDebug) {
    url = app.globalData.debugPath + url + parameter;
  } else {
    url = app.globalData.releasePath + url + parameter;
  }
  console.log(url)
  if (isShowLoading) {
    wx.showLoading({
      title: '加载中',
    })
  }
  return new Promise((resolve, reject) => {
    const response = {};
    wx.request({
      url,
      method,
      success: (res) => response.success = res.data,
      fail: (error) => response.fail = error,
      complete() {
        if (isShowLoading) {
          wx.hideLoading();
        }
        if (app.globalData.showLog) {
          console.info(method, url, parameter);
        }
        if (response.success) {
          if (app.globalData.showLog) {
            console.info('请求成功', response.success);
          }
          if (response.success.status == 500) {
            resolve(response.fail)
          } else {
            resolve(response.success)
          }
        } else {
          if (app.globalData.showLog) {
            console.error('请求失败', response.fail);
          }
          reject(response.fail)
        }
        console.groupEnd();
      },
    });
  });
}