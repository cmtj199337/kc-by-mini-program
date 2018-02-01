var api = require('../../../utils/api.js')
var WxParse = require('../../../wxParse/wxParse.js')
var utils = require('../../../utils/util.js')

Page({
  data: {
    detail: true,
    list: false,
    info: {},
    backList: [],
    currentUrl: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getInfo(options.pid)
    this.getBacklist(options.pid)
  },
  detail (e) {
    this.setData({
      list: false,
      detail: true
    })
  },
  list (e) {
    this.setData({
      detail: false,
      list: true
    })
  },
  getInfo (id) {
    api.get('web/rooms/' + id).then((response) => {
      this.setData({
        info: response
      })
      WxParse.wxParse('content', 'html', response.intro, this, 0);
    })
  },
  getBacklist (id) {
    api.get('web/rooms/' + id + '/reviewlist').then((response) => {
      response.datas.forEach((item, index, arr) => {
        item.startTimeText = utils.cutTwo(item.startTime)
        item.endTimeText = utils.cutTwo(item.endTime)
      })
      this.setData({
        backList: response.datas,
        currentUrl: response.datas[0].recordingFiles[0].filePath
      })
    })
  },
  changePath (item) {
    this.setData({
      currentUrl: item.currentTarget.dataset.path[0].filePath
    })
  }
})