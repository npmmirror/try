// pages/mine/mine.js
const history = getApp().globalData.history;
Page({

  data: {
    historyList: []
  },

  onShow: function () {
    this.setData({
      historyList: history.get()
    })
  },

  // 移除单个
  remove(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '移除历史记录？',
      showCancel: true,
      success: (res) => {
        if (res.confirm) {
          history.remove({id})
        }
        this.setData({
          historyList: history.get()
        })
      }
    })
  },

  clear() {
    wx.showModal({
      title: '清空历史记录？',
      showCancel: true,
      success: (res) => {
        if (res.confirm) {
          this.setData({
            historyList: []
          })
          history.clear()
        }
      }
    })
  },
  navigate(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({ url })
  }
})