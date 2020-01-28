import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/mobx';
import { View } from '@tarojs/components';
import '@tarojs/async-await';
import store from './store';
import './app.less';

class App extends Component {
  /**
   * @type {Taro.Config}
   */
  config = {
    pages: [
      // 'pages/live/list',
      // 'pages/live/play',
      'pages/wandou/list',
      'pages/wandou/play',
      'pages/comic/list',
      'pages/comic/reader',
      // 'pages/video/list',
      // 'pages/video/play',
      'pages/mine/history',
    ],
    window: {
      backgroundTextStyle: 'dark',
      backgroundColor: '#f2f2f2',
      navigationBarBackgroundColor: '#F2F2F2',
      navigationBarTitleText: '偷鸡小程序',
      navigationBarTextStyle: 'black',
      renderingMode: 'mixed'
    },
    debug: false,
    resizable: true,
    style: 'v2',
    tabBar: {
      color: '#cdcdcd',
      selectedColor: '#00aced',
      backgroundColor: '#F2F2F2',
      borderStyle: 'black',
      list: [
        // {
        //   pagePath: 'pages/live/list',
        //   iconPath: 'images/tabbar/live_inactive.png',
        //   selectedIconPath: 'images/tabbar/live_active.png',
        //   text: '秀场直播'
        // },
        {
          pagePath: 'pages/wandou/list',
          iconPath: 'images/tabbar/wandou_inactive.png',
          selectedIconPath: 'images/tabbar/wandou_active.png',
          text: '豌豆直播'
        },
        {
          pagePath: 'pages/comic/list',
          iconPath: 'images/tabbar/comic_inactive.png',
          selectedIconPath: 'images/tabbar/comic_active.png',
          text: '里番漫画'
        },
        // {
        //   pagePath: 'pages/video/list',
        //   iconPath: 'images/tabbar/film_inactive.png',
        //   selectedIconPath: 'images/tabbar/film_active.png',
        //   text: '岛国电影'
        // },
        {
          pagePath: 'pages/mine/history',
          iconPath: 'images/tabbar/history_inactive.png',
          selectedIconPath: 'images/tabbar/history_active.png',
          text: '历史记录'
        }
      ]
    }
  };

  componentDidMount() {
    // 在手机上主动启动开发者模式，绕开域名检查
    if (Taro.getSystemInfoSync().platform !== 'devtools') {
      Taro.setEnableDebug({
        enableDebug: true
      });
    }
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
