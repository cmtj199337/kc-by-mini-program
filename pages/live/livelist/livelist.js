var api = require('../../../utils/api.js')
var utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    livelist: [],
    pages: 1,
    limit: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getList({limit: this.data.limit})
  },

  getList (data) {
    api.get('web/rooms/list', data).then((response) => {
      let startTimeText = ''
      let startTimeYear = ''
      response.datas.forEach((item, index, arr) => {
        item.startTimeText = utils.friendlyACtivityDate(item.startTime)
        item.startTimeYear = utils.dateYear(item.startTime)
      })
      this.setData({
        livelist: response.datas
      })
    })
  },
  toDetails (event) {
    wx.navigateTo({
      url: '../livedetail/livedetail?pid=' + event.currentTarget.dataset.pid
    })
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
    wx.showNavigationBarLoading()
    setTimeout(() => {
      this.getList({ limit: this.data.limit})
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading()
    api.get('web/rooms/list', { limit: this.data.limit, offset: this.data.pages * 10 }).then((response) => {
      this.setData({
        livelist: this.data.livelist.concat(response.datas),
        pages: response.paging.offset / 10 + 1
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})