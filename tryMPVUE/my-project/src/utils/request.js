/**
 * 公共的网络请求方法
 */
const storage = require('./storage.js')
const config = require('../config.js')
const apiHost = config.apiHost
const regetTokenTimeLimit = config.regetTokenTimeLimit
let requestManager = {}
requestManager.tokenRequest = function (param, time) {
  time = time || 0
  return new Promise((resolve, reject) => {
    let token = storage.token
    if (!token) {
      if (time > regetTokenTimeLimit) {
        // 这里可以考虑改成跳到登录页面
        wx.showToast({
          title: '登录失效，请重新登录',
          icon: 'none'
        })
        reject(new Error('登录失效，请重新登录'))
      } else {
        this.wxLogin().then(() => {
          this.tokenRequest(param, time + 1)
            .then(resolve)
            .catch(reject)
        })
      }
    } else {
      wx.request({
        url: apiHost + param.url,
        data: param.data,
        method: param.method || 'GET',
        header: { token },
        success: res => {
          if (res.data.newToken) {
            storage.token = res.data.newToken
          }
          // 4001代表token无效或者token已过期
          // 会重新请求token并再次回调
          if (res.data.errCode !== '4001') {
            if (res.data.errCode === '0000') {
              resolve(res.data)
            } else {
              reject(res.data)
            }
          } else {
            if (time > regetTokenTimeLimit) {
              // console.log('获取token重试次数超过限制')
              wx.showToast({
                title: '登录失效，请重新登录',
                icon: 'none'
              })
              reject(new Error('登录失效，请重新登录'))
            } else {
              this.wxLogin().then(() => {
                this.tokenRequest(param, time + 1)
                  .then(resolve)
                  .catch(reject)
              })
            }
          }
        },
        fail (res) {
          wx.showToast({
            title: '请求失败'
          })
          reject(res)
        }
      })
    }
  })
}

requestManager.request = function (param, header) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: apiHost + param.url,
      data: param.data,
      method: param.method || 'GET',
      header: header,
      success (res) {
        resolve(res.data)
      },
      fail (res) {
        wx.showToast({
          title: '请求失败'
        })
        reject(res)
      }
    })
  })
}

/**
 * 登录并从后台获得token
 */
requestManager.wxLogin = function () {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        this.request({
          url: '/user/wxLogin',
          data: { code: res.code },
          method: 'POST'
        })
          .then(data => {
            if (data.errCode === '0000') {
              storage.token = data.data.token
              resolve()
            }
          })
          .catch(err => {
            reject(err)
            wx.showToast({ title: '微信登录失败' })
          })
      },
      fail: (res) => {
        wx.showToast({ title: '微信登录code异常' })
        reject(res)
      }
    })
  })
}

export { requestManager }
