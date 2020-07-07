const name = 'weapp'

export default function () {
  let app = this
  this.bind(name)
  let $ = app[name]

  $.decrypt = async function (sessionKey, iv, encryptedData) {
    let uri = '/decrypt'
    sessionKey || (sessionKey = app.store.sso.wechat.weapp.sessionKey)
    return this.post(uri, {sessionKey, iv, encryptedData})
  }

  return {
    name,
    unuse: () => {
      delete app[name]
    }
  }
}
