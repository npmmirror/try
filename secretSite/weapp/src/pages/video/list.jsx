import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './list.less';

@inject('videoStore')
@observer
class VideoList extends Component {
  config = {
    navigationBarTitleText: '电影',
    enablePullDownRefresh: true,
  };

  componentDidMount() {
    this.getVideoList();
  }

  getVideoList() {
    const { videoStore } = this.props;
    return videoStore.getList();
  }

  handleClickVideo = (room) => {
    const { videoStore } = this.props;
    videoStore.setVideo(room);
    Taro.navigateTo({
      url: '/pages/video/play'
    });
  };

  onPullDownRefresh() {
    this.getVideoList()
      .then(Taro.stopPullDownRefresh)
      .catch(Taro.stopPullDownRefresh);
  }

  render() {
    const list = this.props.videoStore.list;
    return (
      <View className='wrap video-list'>
        {
          list.map((item) => (
            <View
              className='video-item'
              key={item.key}
              onClick={() => this.handleClickVideo(item)}
            >
              <Image
                src={item.coverSrc}
                mode='aspectFill'
              />
            </View>
          ))
        }
      </View>
    );
  }
}

export default VideoList;
