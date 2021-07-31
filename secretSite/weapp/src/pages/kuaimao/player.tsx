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
    videoId: '',
    videoInfo: null,
    err: '',
  };

  getVideo = async () => {
    const {kuaimaoStore} = this.props;
    const {videoId} = this.data;
    this.data.err = '';
    if (videoId) {
      this.data.videoInfo = null;
      try {
        const [urlRes, infoRes] = await Promise.all([
          kuaimaoStore.getVideoUrl(+videoId),
          kuaimaoStore.getVideoInfo(+videoId)
        ]);
        const videoInfo = infoRes.info;
        videoInfo.url = urlRes.url;
        this.data.videoInfo = videoInfo;
        Taro.setStorageSync('videoId', videoId);
        Taro.setStorageSync('videoInfo', videoInfo);
      } catch (e) {
        this.data.err = '获取地址失败' + e.message;
      }
    }
  };

  handleChangeVideoId = (e) => {
    const val = e.target.value;
    this.data.videoId = val || '';
  };

  step = (step) => {
    const num = parseInt(this.data.videoId);
    if (!Number.isNaN(num)) {
      this.data.videoId = num + step;
    }
  }

  render() {
    const {videoId, videoInfo, err} = this.data;
    return (
      <View className='page'>
        {
          videoInfo && (
            <View className='title'>{videoInfo.name}</View>
          )
        }
        <View className='video__wrapper'>
          {
            videoInfo && (
              <>
                <Video direction={90} src={videoInfo.url} className='video' />
              </>
            )
          }
        </View>
        <View className='input__wrapper'>
          <Button className='input-btn' onClick={() => this.step(-1)}>⬅️</Button>
          <Input
            type='number'
            className='input'
            value={videoId}
            onConfirm={this.getVideo}
            onInput={this.handleChangeVideoId}
          />
          <Button className='input-btn' onClick={() => this.step(1)}>➡️</Button>
        </View>
        <View className='confirm-btn__wrapper'>
          <Button onClick={this.getVideo} className='confirm-btn'>确认</Button>
        </View>
        {
          err && (
            <View>{err}</View>
          )
        }
      </View>
    );
  }
}

export default Player;
