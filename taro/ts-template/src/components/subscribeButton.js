import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import { AtModal, AtButton } from 'taro-ui'
import { observable, toJS } from 'mobx'
import { observer, inject } from '@tarojs/mobx'
import agree_y from '@/assets/images/yes.png'
import agree_n from '@/assets/images/no.png'
import SubscribeMessage from './subscribeMessage'
import './subscribeButton.scss'

@observer
export default class SubscribeButton extends SubscribeMessage {

  handleClick = () => {
    this.props.onClick()
  }

  render() {
    const { text = '', type, disabled } = this.props
    const { isOpened, support, isAgree } = toJS(this.store)
    return (
      <View className='subscribe-content'>
        <AtButton className='subscribe-btn' type={type} disabled={disabled} onClick={this.onClick}>{text}</AtButton>

        <AtModal
          isOpened={isOpened}
          onCancel={this.handleCancle}
          closeOnClickOverlay={false}
        >
          <View className='content'>
            <View className='title'>微易爆服务管理平台</View>
            <View className='tips'>允许发送通知，及时收到通知消息</View>

            <View className='agreement-container' onClick={this.switchAgree}>
              {isAgree && <Image src={agree_y} className='agree-y' />}
              {!isAgree && <Image src={agree_n} className='agree-n' />}
              <View className='tips-container'>
                七天内不再提示
              </View>
            </View>

            <View className='btn-container'>
              <View className='btn btn-cancel' onClick={this.handleCancle}>{`${support ? '取消' : '关闭'}`}</View>
              {support && (
                <Button className='btn btn-auth' openType='openSetting' onClick={this.closeModal} onOpenSetting={this.onOpenSetting}>接收消息</Button>
              )}
            </View>
          </View>
        </AtModal>
      </View>
    )
  }

}
