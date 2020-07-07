const name = 'user'

export default function () {
  let app = this
  this.bind(name)
  let $ = app[name]

  $.userInfos = {}

  $.getUserInfo = async function (id) {
    let doc = this.userInfos[id]
    if (!doc) {
      let uri = `/users/${id}`
      doc = await this.get(uri)
      this.userInfos[id] = doc
    }
    return doc
  }

  $.updateUserInfo = async function (id, opts) {
    let uri = `/users/${id}`
    return this.post(uri, opts)
  }

  $.updatePassword = async function (id, opts) {
    let uri = `/users/${id}/password`
    return this.post(uri, opts)
  }

  return {
    name,
    unuse: () => {
      delete app[name]
    }
  }
}
