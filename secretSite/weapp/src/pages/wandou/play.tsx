import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View, LivePlayer } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import WandouStore from '@/store/WandouStore';

import './play.less';

interface PageProps {
  wandouStore: WandouStore;
}

@inject('wandouStore')
@observer
class WandouLivePlay extends Component<PageProps> {
  config = {
    navigationBarTitleText: '豌豆直播',
  };

  async componentDidMount() {
    const {
      wandouStore: { room },
    } = this.props;
    if (room && room.title) {
      await Taro.setNavigationBarTitle({
        title: room.title || room.user_nicename,
      });
    }
  }

  handleStateChange = (e) => {
    console.log('live-player state change:', JSON.stringify(e.detail));
  };

  render() {
    const {
      wandouStore: { room },
    } = this.props;
    const rtmpUrl = room && room.pull;
    return (
      <View className='wrap'>
        {rtmpUrl && (
          <LivePlayer
            className='player'
            src={rtmpUrl}
            mode='live'
            autoplay
            muted={false}
            orientation='vertical'
            objectFit='contain'
            backgroundMute={false}
            minCache={1}
            maxCache={3}
            onStateChange={this.handleStateChange}
          />
        )}
      </View>
    );
  }
}

export default WandouLivePlay;
