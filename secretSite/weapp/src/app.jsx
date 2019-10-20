import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/mobx';
import { View } from '@tarojs/components';
import '@tarojs/async-await';
import store from './store';
import './app.less';

class App extends Component {
  config = {
    pages: [
      'pages/live/list',
      'pages/live/play'
    ],
    window: {
      backgroundTextStyle: 'dark',
      backgroundColor: '#f2f2f2',
      navigationBarBackgroundColor: '#F2F2F2',
      navigationBarTitleText: '偷鸡小程序',
      navigationBarTextStyle: 'black'
    }
  };

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <View />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
