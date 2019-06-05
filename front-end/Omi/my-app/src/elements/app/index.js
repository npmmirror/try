import { define, WeElement } from 'omi'
import logo from './logo.svg'
import '../app-intro'
import '../hello'
import 'omiu/button'
import 'omi-router'

define('my-app', class extends WeElement {
  static css = require('./_index.less')

  name = 'Omi'
  count = 0

  installed() {
    console.log('installed')
    setTimeout(() => {
      // debugger
      this.store.name = 'Good Job!4444'
      // this.update()
    }, 2000)
    setTimeout(() => {
      // debugger
      this.store.name = 'asdfzxcv'
      // this.update()
    }, 3000)
  }

  clickHandler = () => {
    console.log(123)
    this.name = 'Omio'
    this.update()
  }

  click2 = e => {
    console.log('didi', this.count)
    this.count++
    this.update()
    e.stopPropagation()
  }

  static observe = true

  data = { tag: 'my-home' }

  install() {
    route('/', () => {
      this.data.tag = 'my-home'
    })

    route('/app-intro', evt => {
      console.log(evt.query)
      this.data.tag = 'app-intro'
    })

    route('/hello-element', () => {
      this.data.tag = 'hello-element'
    })

    route('/my-app', () => {
      this.data.tag = 'my-app'
    })

    route('/user/:name/category/:category', evt => {
      this.data.tag = 'my-user'
      this.data.params = evt.params
    })

    route('*', () => {
      console.log('not found')
    })

    route.before = evt => {
      console.log('before')
      //prevent route when return false
      //return false
    }

    route.after = evt => {
      console.log('after')
    }
  }

  onClick = () => {
    route.to('/user/vorshen/category/html')
  }

  render(props, data) {
    return (
      <div class="app">
        <header class="app-header">
          <img
            src={logo}
            onClick={this.clickHandler}
            class="app-logo"
            alt="logo"
          />
          <h1 class="app-title">Welcome to {this.name}</h1>
        </header>
        <app-intro />
        <o-button style="width:200px;">I am omiu button.</o-button>
        <o-button onClick={this.onClick}>click me! {this.count}</o-button>
        <ul>
          <li>
            <a href="#/">Home</a>
          </li>
          <li>
            <a href="#/my-app">my-app</a>
          </li>
          <li>
            <a href="#/app-intro">app-intro</a>
          </li>
          <li>
            <a href="#/hello-element">hello-element</a>
          </li>
          <li>
            <a href="#/about?name=dntzhang&age=18">About Dntzhang</a>
          </li>
        </ul>
        <div id="view">
          <data.tag params={data.params} />
        </div>
        level:{props.level || 0}
        {/*<my-app level={props.level ? props.level + 1 : 0} />*/}
      </div>
    )
  }
})
