import { render } from 'omi'
import '../assets/index.css'
import '../elements/app'
import store from '../store/admin-store'
import '.*/elements/hello'

render(<hello-element />, '#root', store)
setTimeout(() => {
  console.log('ccccccccc')
}, 1000)
