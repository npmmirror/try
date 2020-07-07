import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import Component from './component'

export default class Index extends Component {
  config = {
    enablePullDownRefresh: true
  }

  @observable store = {
    list: [],
    q: '',
    params: {},
    rows: 20
  }

  onPullDownRefresh = async () => {
    await this.load()
    Taro.stopPullDownRefresh()
  }

  onReachBottom = async () => {
    let {page = 1, pages = 0} = this.props.listStore
    if (page >= pages) return
    this.load(++page)
  }

  load = async (page = 1) => {
    const {listStore: store} = this.props
    const {q, params = {}, rows} = this.store
    const data = {rows}
    q && (data.q = q)
    q && (data.keyword = q)
    data.page = page
    const {startTime, endTime, governId, type} = params
    startTime && endTime && (data.startFlowtime = startTime) && (data.endFlowtime = endTime)
    governId && (data.governId = governId)
    type && (data.type = type)
    try {
      const doc = await store.load(data)
      this.store.list = doc.rows || []
    } catch (e) {}
  }

}
