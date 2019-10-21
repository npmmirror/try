import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './list.less';

@inject('videoStore', 'historyStore')
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

  handleClickVideo = (video) => {
    const { videoStore, historyStore } = this.props;
    videoStore.setVideo(video);
    historyStore.addHistory({
      type: 'video',
      cover: video.coverSrc,
      data: video
    });
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
