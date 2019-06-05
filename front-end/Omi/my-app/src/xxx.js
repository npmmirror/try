import { render } from 'omi'
import './assets/index.css'
import './elements/hello'
import store from './store/admin-store'

render(<button>xxx</button>, '#root', store)
