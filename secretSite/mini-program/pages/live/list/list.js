// pages/vid/vidlist.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  
  onLoad() {
    //初始化列表数据
    this.get_szyr_anchorList(this.addToData);
  },
  
  onShow(options) {
    this.timer = setInterval(()=>{
      this.get_szyr_anchorList(this.addToData);
    }, 20000)
  },

  timer: null,

  onHide(){
    clearInterval(this.timer);
  },

  filter(e) {
    let hide = e.detail.value;
    this.setData({
      hide: hide
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.get_szyr_anchorList(this.addToData);
  },

  get_szyr_anchorList: function(callback) {
    wx.request({
      url: 'http://106.53.82.122:7001/szyr/getAll',
      success: function(res) {
        wx.stopPullDownRefresh();
        var response = res.data;
        callback && callback(res.data);
      }
    });
  },
  addToData: function(liveList) {
    // 降序排序
    liveList.sort((a, b) => {
      return b.donate - a.donate;
    });

    console.log("liveList:", liveList);

    this.setData({
      anchors: liveList
    });
  },
  play: function(_event) {
    console.log("对应rid：", _event.currentTarget.dataset.rid);
    wx.navigateTo({
      url: `/pages/live/play/play?rid=${
        _event.currentTarget.dataset.rid
      }&name=${_event.currentTarget.dataset.name}`
    });
  }
});
