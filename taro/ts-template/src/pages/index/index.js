import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import { inject } from 'mobx-react';
import { showErrorAndReLaunch } from '@/utils/utils'

import sdk from '@/sdk'

const {
  showNavigationBarLoading,
  hideNavigationBarLoading,
} = Taro

@inject('userStore')
class Index extends Component {
  async componentDidMount() {
    const { userStore: store } = this.props

    try {
      showNavigationBarLoading()
      let doc = await Taro.getSetting()
      const isAuthed = doc.authSetting['scope.userInfo']
      if (isAuthed) {
        sdk.emit('ready')
      } else {
        Taro.redirectTo({ url: '/pages/bindAccount/index' })
        return
      }

      await sdk.logout()
      await sdk.checkLogin()
    } catch (e) {
      return showErrorAndReLaunch(e)
    } finally {
      hideNavigationBarLoading()
    }

    // eslint-disable-next-line
    const { role, status } = store
    let bLoadMe = false

    let url = '/pages/bindAccount/index'
    // 实际项目用到时去掉注释
    if (!role) {
      // 如果没有角色，跳转到绑定账号
      url = `/pages/bindAccount/index`
    } else {
      // 如果有角色，跳转到用户首页
      bLoadMe = true
      url = '/pages/template/index'
    }

    if (bLoadMe) {
      try {
        await store.loadMe({ silence: true })
      } catch (e) { }
    }

    Taro.redirectTo({ url })
  }

  render() {
    return (
      <View />
    )
  }
}

export default Index
