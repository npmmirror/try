import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Component from './component'
import './infoListItem.scss'

// 详情页面列表
export default class Index extends Component {

  render () {
    const {small, large, notitle, short, long, title, extra} = this.props
    const rootClass = classNames(
      'info-listitem',
      this.props.className
    )
    const titleClass = classNames(
      'info-listitem__title',
      {'info-listitem__title--short': short},
      {'info-listitem__title--long': long},
      {'info-listitem--small': small}
    )

    const extraClass = classNames(
      'info-listitem__extra',
      {'info-listitem__extra--small': small},
      {'info-listitem__extra--large': large},
      {'info-listitem--small': small}
    )

    return (
      <View className={rootClass}>
        {!notitle && <View className={titleClass}>{title}</View>}
        <View className={extraClass}>
          {this.props.children}
          {extra}
        </View>
      </View>
    )
  }
}

Index.defaultProps = {
  small: false, // 小间距，用于内嵌list
  notitle: false, // 无标题
  longtitle: false, // 长标题
  title: '', // 主标题
  extra: '' // 右侧信息
}

Index.propTypes = {
  small: PropTypes.bool,
  notitle: PropTypes.bool,
  title: PropTypes.string,
  extra: PropTypes.string
}
