var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    user: {},
    items: [
      { name: '男', value: '1' ,checked: 'true' },
      { name: '女', value: '0' },
    ],
    nickName: '',
    gender: '',
    intro: '',
    fullName: '',
    company: '',
    position: '',
    email: '',
    city: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      info: wx.getStorageSync('info')
    })
    this.getInfo()
  },
  getInfo () {
    api.get('web/accounts/self').then((response) => {
      this.setData({
        user: response
      })
    })
  },
  inputNickName (e) {
    this.setData({
      nickName: e.detail.value
    })
  },
  radioChange (e) {
    this.setData({
      gender: e.detail.value
    })
  },
  inputIntro (e) {
    this.setData({
      intro: e.detail.value
    })
  },
  inputFullName (e) {
    this.setData({
      fullName: e.detail.value
    })
  },
  inputCompany (e) {
    this.setData({
      company: e.detail.value
    })
  },
  inputPosition (e) {
    this.setData({
      position: e.detail.value
    })
  },
  inputEmail (e) {
    this.setData({
      email: e.detail.value
    })
  },
  inputCity (e) {
    this.setData({
      city: e.detail.value
    })
  },
  submit () {
    let data = {
      nickName: this.data.nickName || this.data.info.nickName,
      gender: this.data.gender || this.data.info.gender,
      intro: this.data.intro || this.data.info.intro,
      fullName: this.data.fullName || this.data.info.fullName,
      company: this.data.company || this.data.info.company,
      position: this.data.position || this.data.info.position,
      email: this.data.email || this.data.info.email,
      city: this.data.city || this.data.info.city
    }
    wx.showToast({
      title: '更新中',
      duration: 1000,
      icon: 'loading'
    })
    api.put('web/accounts/self', data).then((response) => {
      wx.showToast({
        title: '保存成功',
        duration: 1000,
        icon: 'success'
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