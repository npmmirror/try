import { render } from 'omi'
import './assets/index.css'
import './elements/app'
import store from './store/admin-store'

render(<my-app level={1} />, '#root', store)
render(<hello-element />, '#root2', store)
setTimeout(() => {
  console.log('hhh')
  store.name = 'helllll'
  store.rename('ddd')
  console.log('hhh2')
}, 5000)
