import Taro, {PureComponent} from '@tarojs/taro'
import dayjs from 'dayjs'
import {observable} from 'mobx'
import { observer, inject } from '@tarojs/mobx'
import {throttle, compareVersion} from '@/utils/utils'

@inject('userStore', 'dictStore')
@observer
export default class SubscribeMessage extends PureComponent {

  @observable store = {
    isOpened: false,
    isAgree: false,
    support: true   // 是否支持批量订阅
  }

  async isSupportBatch () {  // 是否支持订阅消息批量订阅，Android7.0.7， ios7.0.6之后支持批量操作
    const { dictStore } = this.props
    let { systemInfo = {} } = dictStore
    const {platform, version} = systemInfo
    const support = platform === ('android' && compareVersion(version, '7.0.7') >= 0) || ('ios' && compareVersion(version, '7.0.6') >= 0)
    return support
  }

  onClick = throttle(async () => {
    const { userStore, showModal = true, dictStore } = this.props
    const { sdk, ga } = userStore
    if(ga || !showModal) {  // 公安端直接执行
      this.handleClick()
      return
    }

    let { systemInfo = {} } = dictStore
    const { SDKVersion } = systemInfo
    const canUse = compareVersion(SDKVersion, '2.8.2') >= 0  // 判断基础库版本，高于2.8.2可以使用
    if(!canUse) {
      const versionUpdateData = sdk.storage.getJson('versionUpdateData') || {}  // 版本升级数据
      const {time = 0} = versionUpdateData || {}
      const isExpired = (dayjs().valueOf() - time) > 7 * 24 * 60 * 60 * 1000

      if(!time || isExpired) { // 超时则提醒，否则不提醒
        await Taro.showModal({
          content: '旧版本不支持审核通过消息提醒，请前往应用商店升级微信',
          showCancel: false,
          confirmText: '知道了'
        })
        sdk.storage.setJson('versionUpdateData', {time: dayjs().valueOf()})
      }
      this.handleClick()
      return
    }

    let subscribeData = sdk.storage.getJson('subscribeData')
    if(subscribeData) {
      const {status, time} = subscribeData || {}
      const isExpired = (dayjs().valueOf() - time) > 7 * 24 * 60 * 60 * 1000
      if(status === 1 && !isExpired) {  // 勾选了不再提示并且没有超过七天
        this.handleClick()
        return
      }
    }

    try {
      const res = await Taro.requestSubscribeMessage({  // 如果前面有用到微信的异步api，需要把这个api放到前一个异步api回调中，否则会报错
        tmplIds: [
          'QpAKYhnxBRSbrbCE6JMiCOKaYd2LsgxPqIVDv0r-m4U',
          'DHpnDRFmQy2B9gzv3gFWR9kK2ws_BA7Ic3PQMDy3bMg'
        ]
      })

      const reject =  // 低版本只会请求一个
        res['QpAKYhnxBRSbrbCE6JMiCOKaYd2LsgxPqIVDv0r-m4U'] === 'reject' ||
        res['DHpnDRFmQy2B9gzv3gFWR9kK2ws_BA7Ic3PQMDy3bMg'] === 'reject' ||
        res.errCode

      if(reject) {
        const support = await this.isSupportBatch()
        if(!support) this.store.support = false
        this.store.isOpened = true
        this.props.onSubscribeModal && this.props.onSubscribeModal()
      }else {
        this.handleClick()
      }
    }catch (e) {
      console.error('error: ', e)
      this.handleClick()
    }
  }, 2000)

  switchAgree = () => {
    this.store.isAgree = !this.store.isAgree
  }

  handleCancle = () => {
    this.closeModal()
    this.handleClick()
  }

  closeModal = () => {
    this.store.isOpened = false
    this.props.onSubscribeModal && this.props.onSubscribeModal()
    const { userStore } = this.props
    const { sdk } = userStore
    const data = {
      time: dayjs().valueOf(),
      status: this.store.isAgree ? 1 : 2      // 1：勾选了七天内不再提示， 2：没勾选七天内不再提示
    }
    sdk.storage.setJson('subscribeData', data)
  }

  onOpenSetting = (e) => {
    this.closeModal()
    this.handleClick()
  }

}
