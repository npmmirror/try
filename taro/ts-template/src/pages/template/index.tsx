import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import store from '@/store';

import { AtButton } from 'taro-ui';
import sdk from '@/sdk';
import './index.scss';

interface PageProps {
  userStore: typeof store.userStore;
}

@inject('userStore')
@observer
export default class Template extends Component<PageProps> {
  @observable store = {
    username: '',
    password: '',
    isOpened: false,
  };

  unbindAccount = async () => {
    await sdk.wyb.get('/unbindAccount?isAccountId=1');
    Taro.reLaunch({
      url: '/pages/index/index',
    });
  };

  render() {
    const { userStore } = this.props;
    const me: any = userStore.me;
    return (
      <View>
        <View>我是用户首页</View>
        {me ? (
          <View>
            用户信息：
            <View>{me.name}</View>
            <View>
              <Image src={me.avatarUrl} />
            </View>
          </View>
        ) : (
          <View>无用户信息</View>
        )}
        <AtButton type='primary' onClick={this.unbindAccount}>
          退出登录/账号解绑
        </AtButton>
      </View>
    );
  }
}
