// pages/home/home.js
var api = require('../../utils/api.js');
var app = getApp()
Page({
 
  /** wx  w    fhasjkldfhjkfahsjklfhjk    fjkasdjfkfasdf fasfsdaf fhjsdah fjkhasdjkfh jkasdhfjksakfsdjkafhjkasdf  
   * 页面的初始数据
   */
  data: {
    swipers: [],
    recommends: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    active: 'rgba(255, 255, 255, 0.6)',
    pages: 1,
    limit: 10,
    menuList: [
      { icon: 'https://static.yxt.com/res/imgs/menu-live.png', text: '花瓣直播', type: '../live/livelist/livelist' },
      { icon: 'https://static.yxt.com/res/imgs/menu-course.png', text: '影视课堂', type: '../series/serieslist/serieslist' },
      { icon: 'https://static.yxt.com/res/imgs/menu-activity.png', text: '活动专区', type: '../activity/activitylist/activitylist' },
      { icon: 'https://static.yxt.com/res/imgs/menu-report.png?v1', text: '连载专栏', type: '4' },
      { icon: 'https://static.yxt.com/res/imgs/menu-group.png?v1', text: '小社群', type: '5'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getSwipers()
    this.getRecommend({limit: this.data.limit})
  },
  getSwipers () {
    api.get('web/carousels').then((response) => {
      let list = []
      for (var i in response.datas) {
        if (response.datas[i].status === 1) {
          list.push({
            logoUrl: response.datas[i].logoUrl + '?imageView2/1/w/750/h/380/q/60',
            path: response.datas[i].targetUrl
          })
        }
      }
      this.setData({
        swipers: list
      })
    })
  },
  getRecommend (data) {
    api.get('web/contents/list', data).then((response) => {
      this.setData({
        recommends: response.datas
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  intoModels (event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.type
    })
  },
  intoDes (event) {
    wx.navigateTo({
      url: '../article/article?pid=' + event.currentTarget.dataset.pid
    })
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
    setTimeout(()=>{
      this.getRecommend({ limit: this.data.limit })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */

  onReachBottom: function () {
    wx.showNavigationBarLoading()
    api.get('web/contents/list', {limit:this.data.limit, offset:this.data.pages * 10}).then((response) => {
      this.setData({
        recommends: this.data.recommends.concat(response.datas),
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