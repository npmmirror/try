import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import ComicStore from '@/store/ComicStore';
import HistoryStore, { HistoryListItem } from '@/store/HistoryStore';
import './history.less';

interface PageProps {
  comicStore: ComicStore;
  historyStore: HistoryStore;
}

@inject('historyStore', 'comicStore')
@observer
class HistoryList extends Component<PageProps> {
  config = {
    navigationBarTitleText: '历史记录',
  };

  handleClick = ({ type, data }: HistoryListItem) => {
    const { comicStore } = this.props;
    if (type === 'comic') {
      comicStore.readComic(data);
    } else {
      return Taro.showToast({
        title: '不支持的类型',
        icon: 'none',
      });
    }
  };

  handleLongPress = (item: HistoryListItem) => {
    const { historyStore } = this.props;
    historyStore.remove(item.id);
  };

  handleClear = () => {
    const { historyStore } = this.props;
    historyStore.clear();
  };

  render() {
    const { list } = this.props.historyStore;
    const length = list.length;
    return (
      <View className='wrap'>
        <View className='history-list'>
          {list.map((item) => (
            <View
              className='history-item'
              key={item.id}
              onClick={() => this.handleClick(item)}
              onLongPress={() => this.handleLongPress(item)}
            >
              <View className='type'>里番漫画</View>
              <View className='name'>{item.name || ''}</View>
              <View className='date'>{item.date || ''}</View>
              <Image
                className='history-cover'
                src={item.cover}
                mode='aspectFill'
              />
            </View>
          ))}
        </View>
        {length === 0 ? (
          <View className='nothing'>没有历史记录，快去看点什么吧</View>
        ) : (
          <View onClick={this.handleClear} className='clear'>
            清空全部
          </View>
        )}
      </View>
    );
  }
}

export default HistoryList;
