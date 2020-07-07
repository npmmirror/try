import Taro from '@tarojs/taro'
import { AtDivider } from 'taro-ui'
import Component from './component'

// 信息分割线
export default class Index extends Component {
  render () {
    return (
      <AtDivider height='10px' lineColor='#F0F0F0'/>
    )
  }
}

Index.defaultProps = {}

Index.propTypes = {}
