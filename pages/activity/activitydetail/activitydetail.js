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
    members: [],
    btnText: '',
    content: '',
    startTimeText: '',
    endTimeText: '',
    bTake: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.Init(e.pid)
  },
  moreTakers (event) {
    wx.navigateTo({
      url: '../activitymember/activitymember?pid=' + event.currentTarget.dataset.pid
    })   
  },
  Init (pid) {
   // pid = "895ea6fa-a631-4e30-88fa-291062e69917"
    api.get('web/activities/' + pid).then((res) =>  {
      WxParse.wxParse('content', 'html', res.intro, this, 0);
      let btnText = utils.dateToText(res.startTime, res.endTime, res.registerStartTime, res.registerEndTime).takeText;
      let startTimeText = utils.datenoyear(res.startTime)
      console.log(startTimeText)
      let endTimeText = utils.datenoyear(res.endTime)
      this.setData({
        detail: res,
        btnText: btnText,
        startTimeText: startTimeText,
        endTimeText: endTimeText
      })
      let bTake = this.judgeTake(res)
      this.setData({
        bTake: bTake
      })
      this.setTakeText()
    })
    api.get('web/activities/' + pid + '/members', {limit:6}).then((res) => {
      this.setData({
        members: res.datas
      })
    })
  },
  setTakeText() {
    if (this.data.bTake === 1) {
      this.setData({
        btnText: '已报名'
      })
    }
    if (this.data.bTake === 2) {
      this.setData({
        btnText: '人数已满'
      })
    }
  },
  takeInto: function (event) {
    if (this.data.bTake !== 3 || this.data.btnText !== '立即报名') {
      return
    }
    wx.navigateTo({
      url: '../activitytake/activitytake?pid=' + event.currentTarget.dataset.pid
    })   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  judgeTake(item) {
    if (item.userActivityStatus === 1) {
      return 1
    } else if (item.attendeeNum === 0) {
      return 3
    } else {
      let taken = item.paidCount + item.unpaidCount
      if (taken >= item.attendeeNum) {
        return 2
      } else {
        return 3
      }
    }
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