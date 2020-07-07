import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { AtImagePicker } from 'taro-ui'
import PropTypes from 'prop-types'
import { observable, toJS } from 'mobx'
import { observer, inject } from '@tarojs/mobx'
import Component from './component'

/**
 * 选择图片后自动上传
 */
@inject('userStore')
@observer
export default class Index extends Component {

  @observable store = {
    files: []
  }

  isEnableAddBtn = (files) => {
    let ret = true
    const {count = 0} = this.props
    if (count && files.length >= count) {
      ret = false
    }
    return ret
  }

  onImageChange = async (files) => {
    this.store.files = files
    let loading = false
    const {userStore: store} = this.props
    const tempFiles = files.filter((item) => !item.file)
    for (const item of files) {
      const {url, file} = item
      if (file && file.path) {
        if (!loading) {
          loading = true
          Taro.showLoading({
            title: '正在上传图片',
            mask: true
          })
        }
        try {
          const doc = await store.uploadFile(url)
          item.url = doc.url
          delete item.file
          tempFiles.push(item)
        } catch (e) {
          Taro.showToast({
            title: '图片上传失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    }
    if (loading) {
      this.store.files = tempFiles
      Taro.hideLoading()
    }
    const images = tempFiles.map(({url}) => url)
    this.props.onChange(images)
  }

  onImageClick = (index, file) => {
    Taro.previewImage({
      // current: file.url, // 当前显示图片的http链接
      urls: [file.url] // 需要预览的图片http链接列表
    })
  }

  render () {
    const rootClass = classNames(
      this.props.className
    )
    let {files = []} = this.store
    let {count, multiple, sizeType, sourceType, images = []} = this.props
    if (count === 1) multiple = false
    files = toJS(files)
    if (!files.length) {
      files = images.map(url => {return {url}})
    }

    return (
      <AtImagePicker
        className={rootClass}
        count={count-files.length}
        multiple={multiple}
        sizeType={sizeType}
        sourceType={sourceType}
        showAddBtn={this.isEnableAddBtn(files)}
        files={files}
        onChange={this.onImageChange.bind(this)}
        onImageClick={this.onImageClick.bind(this)}
      />
    )
  }
}

Index.defaultProps = {
  images: [],
  count: NaN, // 允许总图片数量
  multiple: true, // 是否允许一次选多张图片
  sizeType: ['compressed'],
  sourceType: ['album', 'camera'],
  onChange: () => {},
}

Index.propTypes = {
  images: PropTypes.array,
  count: PropTypes.number,
  multiple: PropTypes.bool,
  sizeType: PropTypes.array,
  sourceType: PropTypes.array,
  onChange: PropTypes.func
}
