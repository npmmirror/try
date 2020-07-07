import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Component from './component'
import './infoImages.scss'

// 详情页面列表
export default class Index extends Component {
  onImageClick = (url) => {
    Taro.previewImage({
      current: url, // 当前显示图片的http链接
      urls: this.props.items || [] // 需要预览的图片http链接列表
    })
  }

  render () {
    let {items, imageWidth, imageHeight} = this.props
    const rootClass = classNames(
      'info-images',
      this.props.className
    )

    const imgClass = classNames(
      'info-images__img'
    )

    imageWidth && (imageWidth = Taro.pxTransform(imageWidth))
    imageHeight && (imageHeight = Taro.pxTransform(imageHeight))

    const imgStyle = {
      width: imageWidth || '',
      height: imageHeight || ''
    }

    return (
      <View className={rootClass}>
        {items.map((item, index) => (
          <Image
            taroKey={index} className={imgClass} style={imgStyle} mode='aspectFill' src={item}
            onClick={this.onImageClick.bind(this, item)}
          />
        ))}
      </View>
    )
  }
}

Index.defaultProps = {
  items: []
}

Index.propTypes = {
  items: PropTypes.array,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number
}
