// 用于记录观看历史
const util = require('./util.js');
let history = wx.getStorageSync('history') || [];

// 操作历史记录的对象
const op = {

  get() {
    return history;
  },

  add(data) {
    history.push(Object.assign({
      date: util.formatTime(new Date()),
      id: Date.now()
    }, data))
    wx.setStorageSync('history', history)
  },

  // 移除单个
  remove({id}){
    history = history.filter(item => item.id != id)
    wx.setStorageSync('history', history)
  },

  // 清空
  clear() {
    wx.removeStorageSync('history');
    history = [];
  }
}

module.exports = op;