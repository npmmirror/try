// 列表store生成函数
import { observable } from 'mobx'
import sdk from '../sdk'
import userStore from './user'

const listMap = {}
export default function (name) {
  let store = listMap[name]
  if (!store) {
    store = observable({
      total: 0,
      page: 1,
      pages: 1,
      rows: [],

      async load (opts) {
        const url = `${userStore.prefix}/${name}`
        const doc = await sdk.wyb.get(url, opts)
        if(doc.page !== 1) Object.assign(doc,{rows: this.rows.concat(doc.rows)})
        Object.assign(this, doc)
        return doc
      }

    })
  }
  return store
}
