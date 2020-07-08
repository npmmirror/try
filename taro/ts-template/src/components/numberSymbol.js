import React, { PureComponent } from 'react';
import { View } from '@tarojs/components'

import './divider.scss'

// 数字符号
export default class NumberSymbol extends PureComponent {
  render() {
    const size = this.props.size ? `${this.props.size}rpx` : 0
    const style = {
      'display': 'inline-block',
      'width': size || '35rpx',
      'height': size || '35rpx',
      'text-align': 'center',
      'line-height': size || '35rpx',
      'border-radius': '50%',
      'border': '1px solid #666666',
      'color': '#666666',
      'font-size': size || '30rpx'
    }

    return (
      <View style={style}>{this.props.number}</View>
    )
  }
}
