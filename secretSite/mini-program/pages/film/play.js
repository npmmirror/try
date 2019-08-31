// pages/film/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoSrc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const key = options.key;
    this.setData({
      videoSrc: `https://aicdn-20180326-1.mannersteel.com/${key}/500kb/hls/index.m3u8`,
    })

  },

})