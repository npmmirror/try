import React, { Component } from 'react';
import { Button, Input, Video, View } from '@tarojs/components';
import { inject, observer } from 'mobx-react';
import KuaimaoStore from '@/store/KuaimaoStore';
import { observable } from 'mobx';
import Taro from '@tarojs/taro';
import './player.less';

interface PageProps {
  kuaimaoStore: KuaimaoStore;
}

@inject('kuaimaoStore')
@observer
class Player extends Component<PageProps> {
  componentDidMount() {
    const videoId = Taro.getStorageSync('videoId');
    if (videoId) {
      this.data.videoId = videoId;
    }
    const videoInfo = Taro.getStorageSync('videoInfo');
    if (videoId) {
      this.data.videoInfo = videoInfo;
    }
  }

  @observable
  data: any = {
    videoId: '13805',
    videoInfo: null
  };

   getVideo = async () => {
    const {kuaimaoStore} = this.props;
    const {videoId} = this.data;
    if (videoId) {
      this.data.videoInfo = null;
      const [urlRes, infoRes] = await Promise.all([
        kuaimaoStore.getVideoUrl(+videoId),
        kuaimaoStore.getVideoInfo(+videoId)
      ]);
      const videoInfo = infoRes.info;
      videoInfo.url = urlRes.url;
      this.data.videoInfo = videoInfo;
      Taro.setStorageSync('videoId', videoId);
      Taro.setStorageSync('videoInfo', videoInfo);
    }
  }

  handleChangeVideoId = (e) => {
    // console.log(e);
    const val = e.target.value;
    this.data.videoId = val || '';
  };

  render() {
    const {videoId, videoInfo} = this.data;
    return (
      <View>
        <Input type='number' className='input' value={videoId} onConfirm={this.getVideo} onInput={this.handleChangeVideoId} />
        <Button onClick={this.getVideo}>确认</Button>
        {
          videoInfo && (
            <>
              <View className='title'>{videoInfo.name}</View>
              <Video direction={90} src={videoInfo.url} className='video' />
            </>
          )
        }
      </View>
    );
  }
}

export default Player;
