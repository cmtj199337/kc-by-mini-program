var api = require('../../../utils/api.js');
var utils = require('../../../utils/util.js')

Page({
  data: {
    datas: [],
    limit: 10,
    page: 1
  },
  onLoad(e) {
    api.get('web/activities', {
      orderby:'startTime',
      limit: this.data.limit
    }).then((res) => {
      let statusText = ''
      let startTimeText = ''
      console.log(res)
      res.datas.forEach((item, index, arr) => {
        statusText = utils.dateToText(item.startTime, item.endTime, item.registerStartTime, item.registerEndTime)
        item.statusText = statusText.statusText;
        item.startTimeText = utils.friendlyACtivityDate(item.startTime)
      })
      this.setData({
        datas: res.datas
      })
    })
  },
  intoDes(event) {
    wx.navigateTo({
      url: '../activitydetail/activitydetail?pid=' + event.currentTarget.dataset.pid
    })
  },
onReachBottom () {
  wx.showNavigationBarLoading();
  api.get('web/activities', {
    orderby: 'startTime',
    limit: this.data.limit,
    offset: this.data.page * 10
  }).then((res) => {
    let statusText = ''
    res.datas.forEach((item, index, arr) => {
      statusText = utils.dateToText(item.startTime, item.endTime, item.registerStartTime, item.registerEndTime)
      item.statusText = statusText.statusText;
      item.startTimeText = utils.friendlyACtivityDate(item.startTime)
      console.log(item.startTimeText)
    })
    this.setData({
      datas: this.data.datas.concat(res.datas),
      page: res.paging.offset / 10 + 1
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  })
},
})