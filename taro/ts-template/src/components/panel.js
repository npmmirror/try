import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import Component from './component'

import './panel.scss'

export default class Panel extends Component {
  render () {
    const rootClass = classNames(
      'panel',
      this.props.className
    )

    return (
      <View className={rootClass}>
        {this.props.children}
      </View>
    )
  }
}

Panel.defaultProps = {}

Panel.propTypes = {}
