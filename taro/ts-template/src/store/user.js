import { observable } from 'mobx'
import Taro from '@tarojs/taro'
import sdk from '../sdk'

const store = observable({
  me: null,
  userInfo: null,
  higherGovern: null,  // 是否公安机关

  get sso() {
    return sdk.store.sso || {}
  },

  get role() { // 当前角色
    return this.sso.role
  },

  get sdk() {
    return sdk
  },

  async getCurrentUserId() {
    const sso = this.sso || await sdk.checkLogin()
    return sso.id
  },

  async getCurrentUserInfo() {
    if (!sdk.store.currentUserInfo) {
      const id = await this.getCurrentUserId()
      let doc = await sdk.user.getUserInfo(id)
      const info = await Taro.getUserInfo({ lang: 'zh_CN' })
      const { userInfo } = info
      if (userInfo) {
        sdk.user.updateUserInfo(id, { ...userInfo, nick: userInfo.nickName })
      }
      sdk.store.currentUserInfo = doc
    }
    return sdk.store.currentUserInfo
  },

  async loadMe(opts) {
    this.me = await sdk.wyb.get('/me', {}, opts)
  },

  async uploadFile(filePath, name) {
    let { config, sso } = sdk.store
    // const tmpfile = await Taro.compressImage({src: filePath})
    let doc = await Taro.uploadFile({
      url: config.api + '/upload',
      filePath,
      name: name || 'file_' + Math.random() * 1000000,
      header: {
        'async': true,
        'crossDomain': true,
        'Content-Type': 'application/x-www-form-urlencoded',
        'processData': false,
        'contentType': false,
        'mimeType': 'multipart/form-data',
        'Authorization': sso.token
      }
    })
    if (doc && doc.data) {
      doc = JSON.parse(doc.data)
      const url = `${config.web}/uploads/${doc.files[0].filename}`
      return { url }
    }
    return {}
  },

  async bindAccount(username, password) {
    return sdk.wyb.bindAccount(username, password)
  },

  async updatePassword(id, data) {
    return sdk.user.updatePassword(id, data)
  },

  // 解密
  async decrypt({ sessionKey, iv, encryptedData }) {
    try {
      await Taro.checkSession()
    } catch (e) {
      await sdk.logout()
      await sdk.checkLogin()
    }
    return sdk.weapp.decrypt(sessionKey, iv, encryptedData)
  },

  async logout() {
    sdk.logout()
    this.me = null
    this.higherGovern = null
  }

})

export default store
