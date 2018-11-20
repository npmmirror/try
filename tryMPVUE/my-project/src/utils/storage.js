/**
 * 用于读取和写入缓存
 */
let storageManager = {}

Object.defineProperty(storageManager, 'token', {
  get () {
    return wx.getStorageSync('token')
  },
  set (token) {
    wx.setStorageSync('token', token)
  }
})

Object.defineProperty(storageManager, 'user', {
  get () {
    return wx.getStorageSync('user')
  },
  set (user) {
    wx.setStorageSync('user', user)
  }
})
module.exports = storageManager
