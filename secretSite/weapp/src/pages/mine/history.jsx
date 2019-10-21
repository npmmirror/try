import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './history.less';

@inject('historyStore', 'videoStore', 'comicStore')
@observer
class historyList extends Component {
  config = {
    navigationBarTitleText: '历史记录',
  };

  handleClick = ({ type, data }) => {
    const { comicStore, videoStore } = this.props;
    switch (type) {
      case 'comic':
        comicStore.setComic(data);
        Taro.navigateTo({
          url: '/pages/comic/reader'
        });
        break;
      case 'video':
        videoStore.setVideo(data);
        Taro.navigateTo({
          url: '/pages/video/play'
        });
        break;
      default:
        break;
    }
  };

  handleLongPress = ((id) => {
    this.props.historyStore.removeHistory(id);
  });

  handleClear = () => {
    this.props.historyStore.clearHistory();
  };

  render() {
    const { list } = this.props.historyStore;
    const length = list.length;
    return (
      <View className='wrap'>
        <View className='history-list'>
          {
            list.map((item) => (
              <View
                className='history-item'
                key={item.id}
                onClick={() => this.handleClick(item)}
                onLongPress={() => this.handleLongPress(item.id)}
              >
                <View className='type'>{item.typeName}</View>
                <View className='name'>{item.name || ''}</View>
                <View className='date'>{item.date}</View>
                <Image className='history-cover' src={item.cover} mode='aspectFill' />
              </View>
            ))
          }
        </View>
        {
          length === 0
            ? <View className='nothing'>没有历史记录，快去看点什么吧</View>
            : <View onClick={this.handleClear} className='clear'>清空全部</View>
        }
      </View>
    );
  }
}

export default historyList;
