const getRtmpUrl = require('./getRtmpUrl.js')
let x = "";
Page({
  onLoad(options) {
    this._rid = options.rid
    console.log("options.rid:", options.rid)
    wx.setNavigationBarTitle({
      title: options.name || "直播"
    })
  },

  onReady(options) {
    getRtmpUrl(this._rid).then(rtmpUrl => {
      console.log("打开rtmp：", rtmpUrl)
      this.setData({
        rtmpUrl
      })
    });
    this.ctx = wx.createLivePlayerContext('player')
  },
  
  //全屏并旋转90度
  fullscreen() {
    this.ctx.requestFullScreen({
      direction: 90,
      success: res => {
        console.log('全屏 success')
      },
      fail: res => {
        console.log('全屏 fail')
      }
    })
  },
  statechange(e) {
    console.log('statechange:live-player code:', e.detail.code)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },


  setClipBoard() {
    wx.setClipboardData({
      data: this.data.rtmpUrl
    })
  }
})