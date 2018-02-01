//index.js
//获取应用实例
import login from '../../utils/login.js'
const app = getApp()
Page({
  data: {
    motto: '咖 场',
    info: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(wx.getStorageSync('user'))
    if (!wx.getStorageSync('user')) {
      login.login((user) => {
        //登录成功
        wx.showToast({
          title: '登录中',
          duration: 1000,
          icon: 'loading'
        })
        this.setData({
          info: app.globalData.info,
          hasUserInfo: true
        })
      }, () => {
        //没有获取到用户信息，登录失败
      }, '必须授权登录之后才能操作呢，是否重新授权登录？')
    } else {
      this.setData({
        info: wx.getStorageSync('info'),
        hasUserInfo: true
      })
    }
  },
  toAddress (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }
})