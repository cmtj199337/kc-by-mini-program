var api = require('../../../utils/api.js')
var WxParse = require('../../../wxParse/wxParse.js')
var utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    ask: false,
    btnCss: null,
    btnText: null,
    code: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo(options.pid)
  },
  getInfo (id) {
    api.get('web/rooms/' + id).then((response) => {
      response.startTimeText = utils.friendlyACtivityDate(response.startTime)
      response.startTimeYear = utils.dateYear(response.startTime)
      this.setData({
        info: response,
        btnCss: response.paid === 0 || response.status !== 1,
        ask: true,
        btnText: this.setbtnText(response)
      })
      WxParse.wxParse('content', 'html', response.intro, this, 0);
    })
  },
  setbtnText (res) {
    let judge = () => {
      return res.paid
    }
    let part = judge()
    if (res.status == 2) {
      return part ? '进入直播' : '立即参加'
    } else if (res.status == 1) {
      return part ? '已预约' : '立即预约'
    } else {
      return part ? '进入回看' : '往期回看'
    }
  },
  // 页面支付需要去处理,然后支付就需要登录
  pay () {
    console.log(this.data.info.paid)
    if (this.data.info.paid == 1) {
      this.comein()
    } else {
      api.post('web/rooms/' + this.data.info.pid + '/attendee').then((response) => {
        // console.log(response)
        // this.setData({
        //   btnCss: false
        // })
        this.order()
      })
    }
  },
  comein () {
    if (this.data.info.paid ==  0) {
      this.order()
    } else {
      this.getCode()
    }
  },
  getCode() {
    api.get('web/rooms/' + this.data.info.pid + '/code', { userId: wx.getStorageSync('user').userId }).then((response) => {
      this.setData({
        code: response.code
      })
      this.into()
    })
  },
  into() {
    if (this.data.info.status == 3) {
      wx.redirectTo({
        url: '../liveback/liveback?pid=' + this.data.info.pid
      })
    } else if (this.data.info.status == 2) {
      var path = this.data.info.attendeeUrl.split('roomId')[0] + 'ljCode=' + this.data.code
      wx.navigateTo({
        url: '../../web-view/h5live/h5live?url=' + path.replace('?', '&')
      })
    } else {
      console.log('status3')
    }
  },
  order () {
    wx.showToast({
      title: 'loading',
      duration: 500,
      icon: 'loading'
    })
    if (wx.getStorageSync('user')) {
      api.post('web/pays', { amount: this.data.info.price, transType: 4, targetId: this.data.info.priceId}).then((response) => {
        if (response.url == null) {
          // wx.navigateTo({ url: '/pay/success/' + response.serialNumber + '/' + 'kachang' })
          console.log('url null')
        } else {
        }
      })
    } else {
      // 登录
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})