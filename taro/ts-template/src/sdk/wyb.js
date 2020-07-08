const name = 'wyb'

export default function () {
  let app = this
  // if (app.store.config.env === 'development') {
  // this.bind(name, '/wyb-test')
  // } else {
  this.bind(name)
  // }
  let $ = app[name]

  $.login = async function (code) {
    let uri = `/login`
    return this.post(uri, { code })
  }

  $.chooseRegionByAddress = async function (address) {
    let uri = `/utils/chooseRegionByAddress`
    return this.get(uri, { address })
  }

  $.bindAccount = async function (username, password) {
    let uri = `/bindAccount`
    return this.post(uri, { username, password })
  }

  $.unbindAccount = async function () {
    let uri = `/unbindAccount`
    return this.post(uri)
  }

  return {
    name,
    unuse: () => {
      delete app[name]
    }
  }
}
