import Taro, { Component } from '@tarojs/taro';
import { observer, inject } from '@tarojs/mobx';
import WandouStore from '@/store/WandouStore';
import { View, Image } from '@tarojs/components';
import './list.less';

interface PageProps {
  wandouStore: WandouStore;
}

@inject('wandouStore')
@observer
class WandouLiveList extends Component<PageProps> {
  config: Taro.Config = {
    navigationBarTitleText: '豌豆直播',
    enablePullDownRefresh: true,
  };

  componentDidMount(): void {
    this.getList().catch(() => {});
  }

  getList() {
    const { wandouStore } = this.props;
    return wandouStore.getList();
  }

  onClickRoom = async (room) => {
    const { wandouStore } = this.props;
    wandouStore.playRoom(room);
  };

  onPullDownRefresh() {
    this.getList()
      .then(() => {
        Taro.stopPullDownRefresh();
      })
      .catch(() => {
        Taro.stopPullDownRefresh();
      });
  }

  render() {
    const {
      wandouStore: { list },
    } = this.props;
    return (
      <View className='wrap'>
        {list.map((item) => (
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
            {item.type !== '0' && <View className='live-item--playing'>在秀</View>}
          </View>
        ))}
      </View>
    );
  }
}

export default WandouLiveList;
