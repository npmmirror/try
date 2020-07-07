import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Component from './component'
import './infoList.scss'

// 详情页面列表
export default class Index extends Component {

  render () {
    const {title, small, card} = this.props
    const rootClass = classNames(
      'info-list',
      {'info-list--small': small},
      this.props.className
    )
    const containerClass = classNames(
      {'info-list--card': card}
    )
    const titleClass = classNames(
      'info-list__title',
      {'info-list__title--small': small}
    )
    return (
      <View className={rootClass}>
        {title && <View className={titleClass}>{title}</View>}
        <View className={containerClass}>{this.props.children}</View>
      </View>
    )
  }
}

Index.defaultProps = {
  title: '', // 主标题
  small: false, // 小一号字体，用于内嵌list
  card: false // 卡片形式
}

Index.propTypes = {
  title: PropTypes.string,
  small: PropTypes.bool,
  card: PropTypes.bool
}
