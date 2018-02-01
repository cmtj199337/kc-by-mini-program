var api = require('../../utils/api.js');
var utils = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js')
Page({
  data: {
    article: {},
    content: '',
    commentType: 0,
    src: '',
    vsrc: '',
    ask: false,
    columnList: []
  },
  onLoad (e) {
    // console.log(time1)
    this.Init(e.pid)
  },
  onReachBottom: function () {
   console.log("222")
  },
  Init: function (pid) {
    // console.log(pid)
    this.commentType = 0;
    //console.log(pid)
    //pid = "c7f165f6-6f47-408c-b492-1a3ae9c24a40"
    // var that = this
    api.get('/web/contents/' + pid).then((res) => {
      this.setData({
        ask: true
      })
      res.columnList.forEach((item, index, arr) => {
        if (item.selected) {
          this.setData({
            columnList: this.data.columnList.concat([item])
          })
        }
      })
      //console.log(this.data.columnList)
    if (res.type!== 1) {
      api.get('config/migrate', { fileId: res.fileId, isH5: 1 }, "common").then((res) => {
        if (res.type === 3) {
          this.setData({
            src: res.newPlayListItem.audioFullPath
          })
        } else {
          this.setData({
            vsrc: res.newPlayListItem.videoItems[0].fileFullUrl
          })
          console.log(this.data.vsrc)
        }
      })
    }
    res.publishTime = utils.commentTime(res.publishTime)
      this.setData({
        article: res
      });
      let type = this.data.article.type === 1 ? 95 : this.data.article.type === 2 ? 96 : 97;
      this.setData({
        commentType: type
      });
     console.log(this.data.commentType)
      WxParse.wxParse('content', 'html', res.content, this, 0);
    })
  }
})