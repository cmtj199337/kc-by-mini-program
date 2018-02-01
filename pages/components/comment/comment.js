var api = require('../../../utils/api.js');
//const app = getApp()
Component({
  properties: {
    targetId: {
      type: "String",
      value: ""
    },
    targetType: {
      type: "Number",
      value: 0
    },
    commentCount: {
      type: "Number",
      value: 0
    },
    commentsDefault: {
      type: "String",
      value: "暂无评论，点击抢沙发~"
    },
    cssType: {
      type: "Number",
      value: 0
    }
  },
  data: {
    page: 0,
    commentList: [],
    touchFlag: true,
    writingFlag: false,
    comments: '',
    user: {}

  },
  created() {
  }, 
  ready() {
   this.getCommentList()
   console.log(this.data.cssType)
   this.setData({
     user: wx.getStorageSync('user')
   })
    // console.log(app)  //注释出错
  },
  methods: {
    writingInput (e) {
      console.log("bindinput")
      this.setData({
        comments: e.detail.value
      })
    },
    deleteComment (e) {
      let pid = e.currentTarget.dataset.pid
      let index = parseInt(e.currentTarget.dataset.index)
      var _this = this
      wx.showModal({
        title: '您确定要删除此评论？',
        success () {
          api.delete("comments/" + pid, {}, "common").then((res) => { 
            _this.updateComment()
            let arr = [].concat(_this.data.commentList)
            arr.splice(index, 1)
            _this.setData({
              commentList: arr,
              commentCount: _this.data.commentCount - 1
            })
            console.log(arr)
            // _this.setData({
            //   touchFlag: true,
            //   page: 0,
            //   writingFlag: false,
            //   commentList: [],
            //   commentCount: _this.data.commentCount - 1
            // })
            // console.log(_this)
            // _this.getCommentList() 

          })
        },
        fail () {}
      })
    },
    outWriting () {
      this.setData({
        writingFlag: false
      })
    },
    updateComment () {
      api.put('web/targets/' + this.data.targetId + '/counts?actionType=' + 0 + '&targetType=' + this.data.targetType, {}).then((res) => { })
    },
    putComment () {
      console.log("into")
      api.post("comments", {
        type: this.data.targetType,
        targetId: this.data.targetId,
        content: this.data.comments,
        targetName: 'kc小程序评论'
      }, "common").then((res) => {
        console.log(this.data.comments)
        console.log(this.data.targetId)
        console.log(this.data.targetType)
        this.setData({
          comments: "",
          touchFlag: true,
          page: 0,
          writingFlag: false,
          commentList: [],
          commentCount: this.data.commentCount + 1
        })
       this.getCommentList()
       this.updateComment()
      })
    },
    touchmove () {
      if (this.data.touchFlag === false) {
        return
      } else {
        this.setData({
          touchFlag: false
        })
        this.getCommentList()
      }
    },
    writeComment () {
      this.setData({
        writingFlag: true
      })
    },
    getCommentList () {
      console.log("getComentList")
     api.get('web/targets/' + this.data.targetId + '/comments?type=' + this.data.targetType, {limit: 10, offset: this.data.page * 10}).then((res) => { 
       console.log(res.paging.count)
       this.setData({
         commentList: this.data.commentList.concat(res.datas),
         page: this.data.page + 1,
         touchFlag: true
       })
       if (res.datas.length === 0) {
         this.setData({
           touchFlag: false
         })
       }
     })
    }
  }
})