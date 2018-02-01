var login = require('../../../utils/login.js')
var api = require('../../../utils/api.js')
var WxParse = require('../../../wxParse/wxParse.js')
var utils = require('../../../utils/util.js')
Page({
  data: {
    detail: false,
    list: true,
    info: {},
    artList: [],
    payflag: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getInfo(options.pid)
    this.getlist(options.pid)
  },
  detail(e) {
    this.setData({
      list: false,
      detail: true
    })
  },
  list(e) {
    this.setData({
      detail: false,
      list: true
    })
  },
  getInfo(id) {
    api.get('web/columns/' + id).then((response) => {
      this.setData({
        info: response
      })
      WxParse.wxParse('content', 'html', response.content, this, 0);
    })
  },
  getlist(id) {
    api.get('web/columns/' + id + '/articlelist').then((response) => {
      response.datas.forEach((item, index, arr) => {
        item.startTimeText = utils.friendlyACtivityDate(item.updateTime)
      })
      this.setData({
        artList: response.datas
      })
    })
  },
  toArticle (id) {
    console.log(id.currentTarget.dataset.pid)
    wx.navigateTo({
      url: '../../article/article?pid=' + id.currentTarget.dataset.pid
    })
  },
  pay () {
    this.setData({
      payflag: true
    })
    if (!wx.getStorageSync('user')) {
      login.login((user) => {
        //登录成功
        wx.showToast({
          title: '登录中',
          duration: 1000,
          icon: 'loading'
        })
      }, () => {
        //没有获取到用户信息，登录失败
      }, '必须授权登录之后才能操作呢，是否重新授权登录？')
    } else {
      // 支付逻辑 弹框
    }
  }
})