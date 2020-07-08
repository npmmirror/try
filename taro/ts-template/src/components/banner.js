import React, { Component } from 'react';
import { Image } from '@tarojs/components'
import topBanner from '@/assets/images/zhanghao_bg.png'
import './banner.scss'

export default class Banner extends Component {
  render() {
    return (
      <Image className='img' src={topBanner} />
    )
  }
}
