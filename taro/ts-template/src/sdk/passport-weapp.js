const name = 'passportWeapp'

export default function () {
  let app = this
  this.bind(name, '/passport/weapp')
  let $ = app[name]

  $.login = async function (code) {
    let uri = '/login'
    return this.post(uri, {code})
  }

  return {
    name,
    unuse: () => {
      delete app[name]
    }
  }
}
