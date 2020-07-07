import { View, Text, Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'
import React from 'react';
import AtComponent from './component'

import './card.scss'

export default class Index extends AtComponent {
  handleClick = (...args) => {
    if (_isFunction(this.props.onClick)) {
      this.props.onClick(...args)
    }
  }

  render() {
    const { title, note, extra, thumb, isFull, icon, noHeaderBorder } = this.props
    const rootClass = classNames(
      'at-card',
      {
        'at-card--full': isFull,
        'at-card--noheaderborder': noHeaderBorder
      },
      this.props.className
    )
    const iconClass = classNames({
      'at-icon': true,
      [`at-icon-${icon && icon.value}`]: icon && icon.value,
      'at-card__header-icon': true,
    })
    const iconStyle = {
      color: (icon && icon.color) || '',
      fontSize: (icon && `${icon.size}px`) || '',
    }
    const headerClass = classNames(
      'at-card__header',
      {
        'at-card--noheaderborder__header': noHeaderBorder
      }
    )

    return (
      <View onClick={this.handleClick} className={rootClass}>
        <View className={headerClass}>
          {thumb && (
            <View className='at-card__header-thumb'>
              <Image
                className='at-card__header-thumb-info'
                mode='scaleToFill'
                src={thumb}
              />
            </View>
          )}
          {!thumb && icon && icon.value && (
            <Text className={iconClass} style={iconStyle} />
          )}
          <Text className='at-card__header-title'>{title}</Text>
          {extra && <Text className='at-card__header-extra'>{extra}</Text>}
        </View>
        <View className='at-card__content'>
          <View className='at-card__content-info'>{this.props.children}</View>
          {note && <View className='at-card__content-note'>{note}</View>}
        </View>
      </View>
    )
  }
}

Index.defaultProps = {
  noHeaderBorder: false,
  note: '',
  isFull: false,
  thumb: '',
  title: '',
  extra: '',
  icon: {},
  onClick() { },
}

Index.propTypes = {
  noHeaderBorder: PropTypes.bool,
  note: PropTypes.string,
  isFull: PropTypes.bool,
  thumb: PropTypes.string,
  title: PropTypes.string,
  extra: PropTypes.string,
  icon: PropTypes.object,
  onClick: PropTypes.func,
}
