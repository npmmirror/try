import Taro from '@tarojs/taro'
import { View, Text, RadioGroup, Radio } from '@tarojs/components'
import classNames from 'classnames'
import Component from './component'
import PropTypes from 'prop-types'
import ListItem from './listItem'
import './listItemRadio.scss'

/**
 * 基于ListItem改造，支持Radio选项
 */
export default class ListItemRadio extends Component {

  onChange = (e) => {
    const value = e.detail.value
    this.props.onChange(value)
  }

  render () {
    const {
      note,
      arrow,
      title,
      thumb,
      iconInfo,
      disabled,
      hasBorder,
      options,
      value
    } = this.props

    const rootClass = classNames(
      this.props.className
    )

    const radioStyle = {
      transform: `scale(${this.props.scale || 1})`
    }

    return (
      <ListItem
        form
        className={rootClass}
        title={title}
        note={note}
        arrow={arrow}
        thumb={thumb}
        iconInfo={iconInfo}
        disabled={disabled}
        hasBorder={hasBorder}
      >
        <View className='list-item__extra'>
          <RadioGroup onChange={this.onChange}>
            {
              options.map((item, index) => {
                return (<View taroKey={index} className='list-item__radio-container'>
                  <Radio style={radioStyle} color='#2F78EC' disabled={disabled} value={item.value} checked={item.value === value}/>
                  <Text className='radio-label'>{item.label}</Text>
                </View>)
              })
            }
          </RadioGroup>
        </View>
      </ListItem>
    )
  }
}

ListItemRadio.defaultProps = {
  note: '',
  disabled: false,
  title: '',
  thumb: '',
  hasBorder: true,
  iconInfo: {},
  options: [],
  onChange: () => {},
}

ListItemRadio.propTypes = {
  note: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  thumb: PropTypes.string,
  onChange: PropTypes.func,
  hasBorder: PropTypes.bool,
  arrow: PropTypes.oneOf(['up', 'down', 'right']),
  options: PropTypes.array,
  iconInfo: PropTypes.shape({
    size: PropTypes.number,
    value: PropTypes.string,
    color: PropTypes.string,
    prefixClass: PropTypes.string,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
  })
}
