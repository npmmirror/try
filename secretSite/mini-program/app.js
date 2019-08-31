//app.js
const history = require('./utils/history.js')
App({
  onLaunch: function () {
    wx.setEnableDebug({
      enableDebug: true
    })
  },
  globalData: {
    history,
    transportUrl: 'http://huangzihao.gz01.bdysite.com/?'
  }
})