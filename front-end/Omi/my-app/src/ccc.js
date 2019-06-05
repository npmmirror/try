import { render } from 'omi'
import './assets/index.css'
import './elements/hello'
import store from './store/admin-store'

const fs = global.require('fs')
const path = global.require('path')
fs.readFileSync(path.resolve('./xxx.js'))

render(<button>dididi</button>, '#root', store)
