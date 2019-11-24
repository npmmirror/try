import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { isDevelopment } from '@/util/util';
import './list.less';

@inject('liveStore')
@observer
class LiveList extends Component {
  config = {
    navigationBarTitleText: '直播',
    enablePullDownRefresh: true,
  };

  componentDidMount() {
    this.getLiveList();
  }

  getLiveList() {
    if (isDevelopment) return;
    const { liveStore } = this.props;
    return liveStore.getList();
  }

  onClickRoom = (room) => {
    const { liveStore } = this.props;
    liveStore.setRoom(room);
    Taro.navigateTo({
      url: '/pages/live/play'
    });
  };

  onPullDownRefresh() {
    this.getLiveList()
      .then(Taro.stopPullDownRefresh)
      .catch(Taro.stopPullDownRefresh);
  }

  render() {
    const list = this.props.liveStore.list;
    return (
      <View className='wrap'>
        {
          list.map((item) => (
            <View key={item.rid} className='live-item' onClick={() => this.onClickRoom(item)}>
              <Image
                className='live-item__cover'
                mode='aspectFill'
                src={item.avatar}
                lazyLoad
              />
              <View className='live-item__name'>{item.nickname}</View>
              {
                item.donate > 0 && (
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

export default LiveList;
