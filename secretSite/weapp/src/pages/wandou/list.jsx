import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './list.less';

@inject('wandouStore')
@observer
class WandouLiveList extends Component {
  config = {
    navigationBarTitleText: '豌豆直播',
    enablePullDownRefresh: true,
  };

  componentDidMount() {
    this.getLiveList();
  }

  getLiveList() {
    const { wandouStore } = this.props;
    return wandouStore.getList();
  }

  onClickRoom = (room) => {
    const { wandouStore } = this.props;
    wandouStore.setRoom(room);
    Taro.navigateTo({
      url: '/pages/wandou/play'
    });
  };

  onPullDownRefresh() {
    this.getLiveList()
      .then(Taro.stopPullDownRefresh)
      .catch(Taro.stopPullDownRefresh);
  }

  render() {
    const list = this.props.wandouStore.list;
    return (
      <View className='wrap'>
        {
          list.map((item) => (
            <View key={item.uid} className='live-item' onClick={() => this.onClickRoom(item)}>
              <Image
                className='live-item__cover'
                mode='aspectFill'
                src={item.thumb || item.avatar}
                lazyLoad
              />
              <View className='live-item__name'>
                {item.title}
                {item.user_nicename}
              </View>
              {
                item.type === '2' && (
                  <View className='live-item--playing'>在秀</View>
                )
              }
            </View>
          ))
        }
      </View>
    );
  }
}

export default WandouLiveList;
