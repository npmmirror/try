import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import { AtInput, AtModal } from 'taro-ui'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react';
import CommonBtn from '@/components/commonBtn'
import Banner from '@/components/banner'
import NumberSymbol from '@/components/numberSymbol'

import './index.scss'

@inject('userStore')
@observer
export default class Auth extends Component {
  @observable store = {
    username: '',
    password: '',
    isOpened: false,
    get isValid() {
      return this.username && this.password
    }
  }

  onChange = (key, value) => {
    const { store } = this
    store[key] = value
  }

  onClickSubmit = async () => {
    let doc = await Taro.getSetting()
    const isAuthed = doc.authSetting['scope.userInfo']
    if (!isAuthed) {
      this.store.isOpened = true
      return
    }

    const { userStore } = this.props
    const { username, password } = this.store
    try {
      await userStore.bindAccount(username, password)
    } catch (e) {
      return
    }
    userStore.logout()
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }

  handleAuth = () => {
    Taro.navigateTo({
      url: '/pages/auth/index'
    })
    this.store.isOpened = false
  }

  handleCancel = () => {
    this.store.isOpened = false
  }

  render() {
    const { username, password, isValid, isOpened } = this.store

    return (
      <View>
        <Banner />
        <View className='content'>
          <View className='form'>
            <AtInput
              name='username'
              value={username}
              onChange={this.onChange.bind(this, 'username')}
              type='text'
              placeholder='请输入账号'
              clear
            />
            <AtInput
              name='password'
              type='password'
              value={password}
              onChange={this.onChange.bind(this, 'password')}
              placeholder='请输入密码'
              clear
            />
          </View>
          <CommonBtn
            type='primary'
            disabled={!isValid}
            onClick={this.onClickSubmit}
            text='绑定账号'
          />
        </View>

        <AtModal
          isOpened={isOpened}
          onCancel={this.handleCancel}
        >
          <View className='title'>微易爆服务管理平台</View>
          <View className='feature'>
            <View>
              <NumberSymbol size={30} number={1} />
              <Text>易制爆化学品管控</Text>
            </View>
            <View className='feature-item'>
              <NumberSymbol size={30} number={2} />
              <Text>追踪溯源</Text>
            </View>
          </View>
          <View className='tips'>为了提供更好的服务，首次使用需要您先进行微信授权</View>

          <View className='btn-container'>
            <View className='btn btn-cancel' onClick={this.handleCancel}>取消</View>
            <View className='btn btn-auth' onClick={this.handleAuth}>去授权</View>
          </View>
        </AtModal>
      </View>
    )
  }
}
