import Taro, { Component } from '@tarojs/taro';
import { View, LivePlayer, Button } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './play.less';

@inject('liveStore')
@observer
class LivePlay extends Component {
  config = {
    navigationBarTitleText: '直播',
  };

  componentDidMount() {
    const { liveStore: { room } } = this.props;
    if (room.nickName) {
      Taro.setNavigationBarTitle({
        title: room.nickname
      });
    }
  }

  componentWillUnmount() {
    this.props.liveStore.resetRoom();
  }


  handleStateChange = (e) => {
    console.log('live-player state change:', JSON.stringify(e.detail));
  };

  setClipBoard = () => {
    const room = this.props.liveStore.room;
    const { rtmpUrl = '' } = room;
    Taro.setClipboardData({
      data: rtmpUrl
    });
  };

  render() {
    const room = this.props.liveStore.room;
    const { rtmpUrl = '' } = room;
    return (
      <View className='wrap'>
        <LivePlayer
          className='player'
          src={rtmpUrl}
          mode='RTC'
          autoplay
          muted={false}
          orientation='vertical'
          objectFit='contain'
          backgroundMute={false}
          minCache={1}
          maxCache={3}
          onStateChange={this.handleStateChange}
        />
        {
          rtmpUrl
            ? <Button type='primary' onClick={this.setClipBoard}>复制地址</Button>
            : <Button loading>获取播放地址</Button>
        }
      </View>
    );
  }
}

export default LivePlay;
