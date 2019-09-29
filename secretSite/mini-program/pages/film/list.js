// pages/film/list.js
const history = getApp().globalData.history;
Page({
  api: 'http://106.53.82.122:7001/video/getList?limit=10',

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },

  getList(clean) {
    wx.request({
      url: this.api,
      method: 'GET',
      success: (res) => {
        console.log("res", res)
        if (res.statusCode == 200) {
          const list = res.data
          const list2 = list.map(item => {
            // 视频链接：https://aicdn-20180326-1.mannersteel.com/M4bdKiLd/500kb/hls/index.m3u8
            // 视频封面：https://video.vodstatic.com/B3TyZIm5/1.jpg
            return {
              key: item.secret_key,
              videoSrc: `https://aicdn-20180326-1.mannersteel.com/${item.secret_key}/500kb/hls/index.m3u8`,
              coverSrc: `https://video.vodstatic.com/${item.secret_key}/1.jpg`
            }
          })
          this.setData({
            list: clean?list2:this.data.list.concat(list2)
          })
          wx.stopPullDownRefresh()
        } else {
          wx.showToast({
            icon: 'none',
            title: 'ERROR:' + res.statusCode,
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '请求失败',
        })
      }
    })
  },
  
  onPullDownRefresh(){
    // this.setData({list:[]})
    this.getList(true);
  },

  refresh(){
    wx.startPullDownRefresh()
  },

  onReachBottom(){
    this.getList();
  },

  play(e) {
    const key = e.currentTarget.dataset.key;
    wx.navigateTo({
      url: 'play?key='+key
    })
    const cover = e.currentTarget.dataset.cover;
    history.add({
      type: '岛国电影',
      cover,
      url: '/pages/film/play?key=' + key
    })
  }

})