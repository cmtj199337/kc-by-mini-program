var api = require('../../../utils/api.js');
var utils = require('../../../utils/util.js')
Page({
  data: {
    members: [],
    num: ''
  },
  onLoad(e) {
    // console.log(time1)
    this.Init(e.pid)
  },
  Init: function (pid) {
   // pid ='ce2236a7-ee70-463c-83f1-fc28b40a77d3'
    api.get('web/activities/' + pid + '/members').then((res) => {
      this.setData({
        num: res.paging.count
      });
      res.datas.forEach((item, index, arr) => {
        item.timeText = utils.commentTime(item.createTime)
        //console.log(item.timeText)
      })
      this.setData({
        members: res.datas
      })
    })    
  }
})