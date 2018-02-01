var api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    limit: 10,
    pages: 1,
    type: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.seriesList({ type: this.data.type, limit: this.data.limit})
  },
  seriesList (data) {
    api.get('web/columns/list', data).then((response) => {
      this.setData({
        list: response.datas
      })
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
      this.seriesList({ type: this.data.type, limit: this.data.limit })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading()
    api.get('web/columns/list', { type: this.data.type, limit: this.data.limit, offset: this.data.pages * 10 }).then((response) => {
      this.setData({
        list: this.data.list.concat(response.datas),
        pages: response.paging.offset / 10 + 1
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  },
  intoDes (event) {
    wx.navigateTo({
      url: '../seriesdetail/seriesdetail?pid=' + event.currentTarget.dataset.pid
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})