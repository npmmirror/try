// pages/comic/browser.js
Page({

  data: {
    imgUrl: "",
    pageNo: 1,
    //来自于option
    pageNumber: 1,// 总页数
    urlFormat: "",// 图片路径格式

    preload_imgUrl: "",
    preloadPageNo: 0,//预加载到的页数

    // 是否使用代理地址
    transportUrl: wx.getStorageSync('transportUrl')
  },

  onLoad: function (options) {
    let transportUrl = wx.getStorageSync('transportUrl')
    this.setData({ transportUrl: transportUrl })

    console.log(options)
    wx.setNavigationBarTitle({
      title: options.name || "漫画"
    })
    this.setData({
      pageNumber: options.number,
      urlFormat: options.format,
    })
    this.loadImage()
  },

  //根据页数加载图片
  loadImage() {
    this.setData({
      imgUrl: this.data.transportUrl + this.data.urlFormat.replace("%s", this.data.pageNo),
    })

    // 如果没有开始预加载
    if (this.data.preloadPageNo < this.data.pageNo) {
      this.setData({
        preloadPageNo: this.data.pageNo,
        preload_imgUrl: this.data.transportUrl + this.data.urlFormat.replace("%s", this.data.pageNo),
      })
    }
  },

  //预加载下一张
  preload_Image() {
    //到尾就不加载了
    if (this.data.preloadPageNo >= this.data.pageNumber) { console.log("end"); return; }

    this.setData({
      preload_imgUrl: this.data.transportUrl + this.data.urlFormat.replace("%s", this.data.preloadPageNo + 1),
      preloadPageNo: this.data.preloadPageNo + 1
    })
  },

  //点击左右两边时的翻页事件
  paging(e) {
    var direction = Number(e.currentTarget.dataset.direction)
    if (this.data.pageNo == 1 && direction == -1) {
      wx.showToast({
        icon: 'none',
        title: '现在就是第一页',
      })
      return;
    }
    if (this.data.pageNo == this.data.pageNumber && direction == 1) {
      wx.showToast({
        icon: 'none',
        title: '已经到最后一页了',
      })
      return;
    }
    this.setData({ pageNo: this.data.pageNo + direction })
    this.loadImage()
  },
})