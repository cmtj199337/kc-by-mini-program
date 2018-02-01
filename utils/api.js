// api
import Promise from './es6-promise.min'

// dev - 测试环境, production - 产线环境
const env = 'dev'

const apiServer = env === 'dev' ? {
    apimain: 'https://devinner.yunxuetang.com.cn/kacapi/v1/', 
    apicommon: 'https://devinner.yunxuetang.com.cn/componentapi/v1/'
  } : {
    apimain: 'https://api-kac.yxt.com/v1/', 
    apicommon: 'https://api-component.yxt.com/v1/'
  }

const imageBaseUrl = env === 'dev' ? '//zhidao-test.yxt.com/' : '//zhidao.yxt.com/'

let info = wx.getStorageSync('user')

module.exports = {
  // servername - 设字符串'common'
  get(action, data, servername) {
    let app = getApp()
    let headerObj = {
      'Content-Type': 'application/json',
      'source': '301'
    }
    // 没token， url参数用accountId
    if (!info.token) {
      if (action.indexOf('?') > 1) {
        action = ((servername && (servername === 'common')) ? apiServer.apicommon : apiServer.apimain) + action + '&accountId=' + app.globalData.accid
      } else {
        action = ((servername && (servername === 'common')) ? apiServer.apicommon : apiServer.apimain) + action + '?accountId=' + app.globalData.accid
      }
    } else {
      action = ((servername && (servername === 'common')) ? apiServer.apicommon : apiServer.apimain) + action
      headerObj.token = info.token
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: action,
        header: headerObj,
        data: data,
        success: function (res) {
          if (res.statusCode == 403) {
            console.log('过期的token')
            wx.clearStorage()
            if (!wx.getStorageSync('user')) {
              wx.redirectTo({
                url: './../home/home'
              })
            }
            // 怎么能刷新当前页面。。。
            // wx.redirectTo({
            //   url: './../home/home'
            // })
          }
          resolve(res.data)
        },
        fail: function (res) {
          reject(res.data)
        },
        complete: function (res) {
        }
      })
    })
  },

  post (action, data, servername) {
    let headerObj = {
      'Content-Type': 'application/json',
      'source': '301'
    }
    if (info.token) { 
      headerObj.token = info.token
    }
    action = ((servername && (servername === 'common')) ? apiServer.apicommon : apiServer.apimain) + action
    return new Promise((resolve, reject) => {
      wx.request({
        url: action,
        data: data,
        method: 'POST',
        header: headerObj,
        success: function (res) {
          if (res.statusCode == 403) {
            wx.clearStorage()
          }
          resolve(res.data)
        },
        fail: function (res) {
          reject(res.data)
        }
      })
    })
  }, 
  put(action, data, servername) {
    let headerObj = {
      'Content-Type': 'application/json',
      'source': '301'
    }
    if (info.token) {
      headerObj.token = info.token
    }
    action = ((servername && (servername === 'common')) ? apiServer.apicommon : apiServer.apimain) + action
    return new Promise((resolve, reject) => {
      wx.request({
        url: action,
        data: data,
        method: 'PUT',
        header: headerObj,
        success: function (res) {
          resolve(res.data)
        },
        fail: function (res) {
          reject(res.data)
        }
      })
    })
  },
  delete(action, data, servername) {
    let headerObj = {
      'Content-Type': 'application/json',
      'source': '301'
    }
    if (info.token) {
      headerObj.token = info.token
    }
    action = ((servername && (servername === 'common')) ? apiServer.apicommon : apiServer.apimain) + action
    return new Promise((resolve, reject) => {
      wx.request({
        url: action,
        data: data,
        method: 'DELETE',
        header: headerObj,
        success: function (res) {
          resolve(res.data)
        },
        fail: function (res) {
          reject(res.data)
        }
      })
    })
  },


  json2Form (json) {
    var str = []
    for (var p in json) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]))
    }
    return str.join("&")
  }
  
}