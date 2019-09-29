// pages/comic/list.js
const history = getApp().globalData.history;
Page({
  api: "http://106.53.82.122:7001/comic/getList/?limit=9",
  /**
   * 页面的初始数据
   */
  data: {
    debug : 1,
    comics_list: [],
    transportUrl: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let transportUrl = wx.getStorageSync('transportUrl')||""
    this.setData({ transportUrl: transportUrl })

    this.getList()
  },

  onPullDownRefresh(){
    this.getList()
  },

  browserComic(e){
    var data = e.currentTarget.dataset
    console.log(data)
    wx.navigateTo({
      url: '/pages/comic/browser2?format='+data.format+"&number="+data.number+"&name="+data.name,
    })
    history.add({
      type:'里番漫画',
      name:data.name,
      cover:data.format.replace('%s',''),
      url: '/pages/comic/browser2'+'?format=' + data.format + "&number=" + data.number + "&name=" + data.name,
    })
  },
  
  getList() {
    const self = this;
    wx.request({
      url: self.api,
      method: 'GET',
      success: function (res) {
        console.log("res", res)
        if(res.statusCode == 200){
          self.setData({
            comics_list:res.data
          })
          wx.stopPullDownRefresh()
        } else {
          wx.showToast({
            icon: 'none',
            title: 'ERROR:' + res.statusCode,
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          icon: 'none',
          title: '请求失败',
        })
      }
    })
  },

  useProxy(e){
    let use = e.detail.value
    let app = getApp()
    console.log('switch',use)
    if(use){
      this.setData({
        transportUrl: app.globalData.transportUrl        
      })
      wx.setStorageSync('transportUrl', app.globalData.transportUrl)
    }
    else {
      this.setData({
        transportUrl: ''
      })
      wx.setStorageSync('transportUrl', '')
    }
  }
})