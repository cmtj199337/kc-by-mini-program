var api = require('../../../utils/api.js');
//const app = getApp()
Component({
  properties: {
    praiseCount: {
      type: Number,
      value: 0
    },
    pid: {
      type: String,
      value: ''
    },
    commentType: {
      type: Number,
      value: 0
    }
  },
  data: {
    bPraise: false
  },
created () {
  //console.log(this.data)

},
ready () {
  this.checkPraise()
 // console.log(app)  //注释出错
},
  methods: {
    checkPraise () {
      //console.log(this.data.commentType)
      api.post('users/' + wx.getStorageSync('user').userId + '/praises/praised', {
         type: this.data.commentType,
         targetId: this.data.pid
       }, 'common' ).then((res) => {
        // console.log(res)
         this.setData({
           bPraise: res.praised
         })
       })
    },
    setLike () {
      let content = !this.data.bPraise ? 1 : 0;
      api.post('praises',{
        type: this.data.commentType,
        targetId: this.data.pid,
        content: content,
        targetName: 'kc小程序点赞'
      },'common').then((res) => {
        api.put('web/targets/' + this.data.pid + '/counts?actionType=' + 1+ '&targetType=' +     this.data.commentType,{
        }).then((res) => {
        })
        if (content === 1) {
          this.setData({
            praiseCount: this.data.praiseCount + 1
          })
        } else {
          this.setData({
            praiseCount: this.data.praiseCount - 1
          })         
        }
        this.setData({
          bPraise: !this.data.bPraise
        })
      })
    }
  }
})