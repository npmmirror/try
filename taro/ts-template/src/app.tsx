import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { Provider } from 'mobx-react';

import sdk from '@/sdk';
import store from '@/store';
import '@/api'; // 引入是为了初始化 api 变量
import { showErrorAndReLaunch } from '@/utils/utils';

import './app.scss';

const logger = sdk.getLogger('app');

class App extends Component {
  componentWillMount() {
    const { storage, store } = sdk;
    store.systemInfo = Taro.getSystemInfoSync();
    if (sdk.isBrowser()) {
      let args = sdk.getArgs();
      if (args.token) {
        let sso = { token: args.token };
        storage.setJson('sso', sso);
        store.sso = sso;
      }
    }
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError(e) {
    logger.error(e);
    showErrorAndReLaunch(e);
  }

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider {...store}>{this.props.children}</Provider>;
  }
}

export default App;
