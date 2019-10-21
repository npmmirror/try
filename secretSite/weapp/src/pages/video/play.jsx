import Taro, { Component } from '@tarojs/taro';
import { View, Video } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './play.less';

@inject('videoStore')
@observer
class LivePlay extends Component {
  config = {
    navigationBarTitleText: '播放岛国电影',
  };

  render() {
    const { videoSrc = '' } = this.props.videoStore.video;
    return (
      <View className='wrap'>
        {
          videoSrc && (
            <Video
              src={videoSrc}
              controls
              autoPlay
              className='player'
            />
          )
        }
      </View>
    );
  }
}

export default LivePlay;
