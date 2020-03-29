import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/mobx';
import store from '@/store';
import '@/api';
import './app.less';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/wandou/list',
      'pages/wandou/play',
      'pages/comic/list',
      'pages/comic/reader',
      'pages/mine/history',
    ],
    window: {
      backgroundTextStyle: 'dark',
      backgroundColor: '#f2f2f2',
      navigationBarBackgroundColor: '#F2F2F2',
      navigationBarTitleText: '偷鸡小程序',
      navigationBarTextStyle: 'black',
      // @ts-ignore
      // 小程序强制开启同层渲染
      renderingMode: 'mixed',
    },
    debug: false,
    resizable: false,
    style: 'v2',
    tabBar: {
      color: '#cdcdcd',
      selectedColor: '#00aced',
      backgroundColor: '#F2F2F2',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/wandou/list',
          iconPath: 'assets/tabbar/wandou_inactive.png',
          selectedIconPath: 'assets/tabbar/wandou_active.png',
          text: '豌豆直播',
        },
        {
          pagePath: 'pages/comic/list',
          iconPath: 'assets/tabbar/comic_inactive.png',
          selectedIconPath: 'assets/tabbar/comic_active.png',
          text: '里番漫画',
        },
        {
          pagePath: 'pages/mine/history',
          iconPath: 'assets/tabbar/history_inactive.png',
          selectedIconPath: 'assets/tabbar/history_active.png',
          text: '历史记录',
        },
      ],
    },
    sitemapLocation: 'sitemap.json'
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store} />;
  }
}

// eslint-disable-next-line react/no-deprecated
Taro.render(<App />, document.getElementById('app'));
