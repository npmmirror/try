/**
 * 公共的接口
 */
const { requestManager: rq } = require('./request.js')
const storage = require('./storage.js')
module.exports = {
  updateUserInfo: function (param) {
    rq.tokenRequest({
      url: '/user/updateUser',
      data: param,
      method: 'POST'
    })
      .then(data => {
        // console.log(data)
        storage.user = data.data.userInfo
      })
      .catch(err => {
        console.error(err)
      })
  },

  getAllUser: function (param) {
    rq.tokenRequest({
      url: '/user/getAllUser',
      data: param
    })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
  }
}

// 判断是否已经授权登录
Object.defineProperty(module.exports, 'hasLogin', {
  get () {
    return !!storage.user
  }
})
