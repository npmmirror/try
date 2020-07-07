import MS from 'jm-ms-core'
import Taro from '@tarojs/taro'
import error from 'jm-err'
import mdl from 'jm-ms-http-client/dist/module'
import { showError } from '@/utils/utils'

const adapter = {
  async request(url, data, opts) {
    const { silence } = opts || {}
    let _opts = { url, data, ...opts, header: opts.headers }
    try {
      const timer = setTimeout(() => {
        Taro.showNavigationBarLoading()
      }, 500)
      const doc = await Taro.request(_opts)
      clearTimeout(timer)
      return doc
    } catch (e) {
      e.silence = silence
      throw e
    } finally {
      Taro.hideNavigationBarLoading()
    }
  }
}

const name = 'taro'

export default function () {
  const app = this
  this.ms = new MS()
  this.ms.use(mdl(adapter))
  let router = this.ms.router()

  const storage = this.storage
  storage.setItem = function (k, v) {
    this.emit('setItem', k, v)
    Taro.setStorageSync(k, v)
  }
  storage.getItem = function (k) {
    let v = Taro.getStorageSync(k)
    this.emit('getItem', k, v)
    return v
  }
  storage.removeItem = function (k) {
    this.emit('removeItem', k)
    Taro.removeStorageSync(k)
  }

  this.ms.client({ uri: this.store.config.api })
    .then(doc => {
      router.use(doc)
      this._router = router
    })

  // 拦截，记录request日志，及输出标准的错误格式
  app.on('error', e => {
    const { silence } = e
    e.status || (e.status = 500)
    const { data } = e
    if (data && data.err) {
      !silence && (showError(e))
      return
    }
    const { message } = e
    let pattern = /^[\s\S]*(?:timeout|timed out)[\s\S]*$/
    let status = 505
    let msg = '网络异常'
    if (pattern.test(message)) {
      status = 504
      msg = '系统繁忙，请稍后再试。'
    }
    !silence && (showError(msg))
    throw error.err({ err: status, msg, status })
  })

  this.login = async () => {
    let doc = await Taro.login()
    // if (!doc) {
    //   let web = config.web
    //   let uri = `${web}/wechat/oauth.html?redirect_uri=${window.location.href}`
    //   doc = await sdk.wechat.get(`/oauth/uri?uri=${uri}`)
    //   window.location.href = doc.uri
    // }
    if (!doc.code) throw new Error('登陆失败')
    doc = await app.wyb.login(doc.code)

    if (!doc || !doc.token) throw new Error('登陆失败')
    return doc
  }

  return {
    name,
    unuse: () => {
      delete app[name]
    }
  }
}
