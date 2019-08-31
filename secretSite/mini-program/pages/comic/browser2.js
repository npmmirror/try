// pages/comic/browser2.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 是否使用代理地址
    transportUrl: "",
    imageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const transportUrl = wx.getStorageSync("transportUrl") || "";
    this.setData({ transportUrl: transportUrl });
    this.options = options;

    console.log(options);
    wx.setNavigationBarTitle({
      title: options.name || "漫画"
    });
    this.setData({
      pageNumber: options.number,
      urlFormat: options.format
    });
    this.loadImage(options);
  },

  loadImage({ number, format }) {
    const list = [];
    for (let i = 1; i <= number; i++) {
      list.push(format.replace("%s", i));
    }
    this.setData({
      imageList: list
    });
  },

  onShareAppMessage() {
    const {options} = this;
    return {
      title: options.name,
      path: '/pages/comic/browser2?format='+options.format+"&number="+options.number+"&name="+options.name,
      imageUrl: options.format.replace('%s','')
    }
  }
});
