import Taro from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'
import PropTypes from 'prop-types'
import Component from './component'
import { observable } from 'mobx'
import { observer } from '@tarojs/mobx'

@observer
export default class Panel extends Component {
  constructor (opts = {}) {
    super(opts)
    this.store.q = opts.q || ''
  }

  @observable store = {
    q: ''
  }

  onChangeSearch = (value) => {
    this.store.q = value
  }

  onClearSearch = () => {
    this.store.q = ''
    this.onClickSearch()
  }

  onClickSearch = () => {
    this.props.onSearch(this.store.q)
  }

  render () {
    const {q} = this.store
    return (
      <AtSearchBar
        fixed={this.props.fixed}
        value={q}
        placeholder={this.props.placeholder || '搜索'}
        onChange={this.onChangeSearch.bind(this)}
        onClear={this.onClearSearch.bind(this)}
        onActionClick={this.onClickSearch.bind(this)}
        onConfirm={this.onClickSearch.bind(this)}
      />
    )
  }
}

Panel.defaultProps = {
  q: '',
  onSearch: () => {}
}

Panel.propTypes = {
  q: PropTypes.string,
  onSearch: PropTypes.func
}
