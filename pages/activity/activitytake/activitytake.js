// pages/activity/activitydetail/activitydetail.js
var api = require('../../../utils/api.js');
var utils = require('../../../utils/util.js')
var WxParse = require('../../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
    },
    formData: {
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.Init(e.pid)
  },
  next (event) {
    if (this.validate()) {
      api.post('web/activities/' + event.currentTarget.dataset.pid+ '/members').then((res) => {
      })
    }
  },
  validate () {
    if (!this.data.formData.fullName) {
      wx.showToast({
        title: '请输入姓名'
      })
      return false;
    } 
     if (!this.data.formData.mobile) {
      wx.showToast({
        title: '请输入正确的电话号码'
      })
      return false
    }
    if (this.data.formData.remark) {
      if (!/^[1-9]+[0-9]*]*$/.test(this.data.formData.employeeNum)) {
        wx.showToast({
          title: '在职人数必须是个数字'
        })
        return false
      }
    }
     return true
  },
  Init(pid) {
   // pid = "895ea6fa-a631-4e30-88fa-291062e69917"
    api.get('web/activities/' + pid).then((res) => {
        this.setData({
          detail: res
        })
    })
    api.get('web/activities/' + pid + '/mylatestinfo').then((res) => {
      this.setData({
        formData: res
      })
      if (!this.data.formData.fullName) {
        api.get('web/accounts/sef').then((res) => {
          this.setData({
            formData: res
          })
        })
      }
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