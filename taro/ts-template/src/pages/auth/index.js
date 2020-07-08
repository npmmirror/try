import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import sdk from '@/sdk'
import Banner from '@/components/banner'
import { reLaunch } from '@/utils/utils'

import logo from '@/assets/images/logo.png'
import agree_y from '@/assets/images/yes.png'
import agree_n from '@/assets/images/no.png'
import './index.scss'

export default class Auth extends Component {
  state = {
    agree: false
  }

  onGotUserInfo = async (e) => {
    const data = e.detail
    if (!data.userInfo) return
    sdk.emit('ready')

    Taro.showLoading()
    try {
      const sso = await sdk.checkLogin()
      const { id } = sso
      sdk.user.updateUserInfo(id, { ...data.userInfo, nick: data.userInfo.nickName })
      Taro.showToast({
        title: '授权成功',
        duration: 2000
      })
      if (sso?.role) {
        reLaunch()
        return
      }
    } catch (err) {
      Taro.showToast({
        title: '授权失败',
        duration: 2000
      })
      return
    } finally {
      Taro.hideLoading()
    }
    setTimeout(() => {
      Taro.navigateBack()
    }, 2000)
    // reLaunch()
  }

  toAgreement = (e) => {
    e.stopPropagation()
    Taro.navigateTo({
      url: '/pages/auth/agreement'
    })
  }

  switchAgree = () => {
    this.setState({
      agree: !this.state.agree
    })
  }

  render() {
    const { agree } = this.state
    return (
      <View>
        <Banner />
        <View className='content'>
          <Image className='logo' src={logo} />
          <AtButton
            type='primary'
            className='btn'
            openType='getUserInfo'
            lang='zh_CN'
            disabled={!agree}
            onGetUserInfo={this.onGotUserInfo}
          >获取授权</AtButton>
          <View className='agreement-container' onClick={this.switchAgree}>
            {agree && <Image src={agree_y} className='agree-y' />}
            {!agree && <Image src={agree_n} className='agree-n' />}
            <View className='tips-container'>
              <Text className='tips'>阅读并同意协议</Text>
              <Text className='tips agreement-content' onClick={this.toAgreement}>《服务协议》</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
