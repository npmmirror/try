import { Component } from 'react';
import { Provider } from 'mobx-react';

import store from '@/store';

import '@/api';
import './app.less';
import Taro from '@tarojs/taro';

class App extends Component {
  componentDidMount() {
    // 在手机上主动启动开发者模式，绕开域名检查
    if (Taro.getSystemInfoSync().platform !== 'devtools') {
      Taro.setEnableDebug({
        enableDebug: true,
      }).catch(() => {});
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider {...store}>{this.props.children}</Provider>;
  }
}

export default App;
