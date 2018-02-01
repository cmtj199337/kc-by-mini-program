import api from './api'

module.exports = {
  login () {
    var sucess = arguments[0] ? arguments[0] : function () {}//登录成功的回调
    var fail = arguments[1] ? arguments[1] : function () {}//登录失败的回调
    var title = arguments[2] ? arguments[2] : '授权登录失败，部分功能将不能使用，是否重新登录？'//当用户取消授权登录时，弹出的确认框文案

    var user = wx.getStorageSync('user')//登录过后，用户信息会缓存
    if (!user) {
      wx.login({
        success: function (res) {
          var code = res.code
          wx.getUserInfo({
            success: function (res) {
              var app = getApp()
              let loginObj = {
                code: code,
                configId: app.globalData.accid,
                encryptedData: res.encryptedData,
                iv: res.iv
              }
              api.post('web/weixin/wxadoclogin', loginObj).then((response) => {//调用服务器端登录，保存用户数据到服务器
                var app = getApp()
                wx.setStorageSync('user', response)//本地缓存user数据   下次打开不需要登录
                wx.setStorageSync("info", res.userInfo)
                app.globalData.userInfo = response//在当前的app对象中缓存user数据
                app.globalData.info = res.userInfo
                sucess(response)
              })
            },
            fail: function (res) {//用户点了“拒绝”
              wx.showModal({
                title: '提示',
                content: title,
                showCancel: true,
                cancelText: "否",
                confirmText: "是",
                success: function (res) {
                  var code = res.code
                  if (res.confirm) {
                    if (wx.openSetting) {//当前微信的版本 ，是否支持openSetting
                      wx.openSetting({
                        success: (res) => {
                          if (res.authSetting["scope.userInfo"]) {//如果用户重新同意了授权登录
                            wx.getUserInfo({//同上  sucess处理逻辑一样
                              success: function (res) {
                                var app = getApp()
                                let loginObj = {
                                  code: code,
                                  configId: app.globalData.accid,
                                  encryptedData: res.encryptedData,
                                  iv: res.iv
                                }
                                api.post('web/weixin/wxadoclogin', loginObj).then((response) => {
                                  var app = getApp()
                                  wx.setStorageSync("user", response)
                                  wx.setStorageSync("info", res.userInfo)
                                  app.globalData.userInfo = response
                                  app.globalData.info = res.userInfo
                                  sucess(response)
                                })
                              }
                            })
                          } else {//用户还是拒绝
                            fail()
                          }
                        },
                        fail: function () {//调用失败，授权登录不成功
                          fail()
                        }
                      })
                    } else {
                      fail()
                    }
                  }
                }
              })
            }
          })
        },
        fail: function (res) {
          fail()
        }
      })
    } else {//如果缓存中已经存在user  那就是已经登录过
      var app = getApp()
      app.globalData.userInfo = user
      app.globalData.info = wx.getStorageSync("info")
      sucess(user)
    }
  }
}