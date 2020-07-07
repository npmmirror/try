import React, { PureComponent } from 'react';
import {AtButton} from 'taro-ui'
import { View } from '@tarojs/components'
import { throttle } from '@/utils/utils'

export default class CommonBtn extends PureComponent {

  handleClick = throttle(() => {
    this.props.onClick();
  })

  render () {
    const {type = 'primary', text = '', disabled = false, fixed = false } = this.props
    const btnStyle = {}
    if(fixed) {
      Object.assign(btnStyle, {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: 'white'
      })
    }
    return (
      <View style={btnStyle} className='btn-container'>
        <AtButton
          type={type}
          disabled={disabled}
          className='btn'
          onClick={this.handleClick}
        >{text}</AtButton>
      </View>
    )
  }
}
