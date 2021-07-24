import { Config } from '@tarojs/taro';

const config: Config = {
  pages: [
    // 'pages/wandou/list',
    // 'pages/wandou/play',
    'pages/kuaimao/player',
    'pages/comic/list',
    'pages/comic/reader',
    // 'pages/hanman/search',
    // 'pages/hanman/read',
    'pages/mine/history',
  ],
  window: {
    backgroundTextStyle: 'dark',
    backgroundColor: '#f2f2f2',
    navigationBarBackgroundColor: '#F2F2F2',
    navigationBarTitleText: '偷鸡小程序',
    navigationBarTextStyle: 'black',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
      // {
      //   pagePath: 'pages/wandou/list',
      //   iconPath: 'assets/tabbar/wandou_inactive.png',
      //   selectedIconPath: 'assets/tabbar/wandou_active.png',
      //   text: '豌豆直播',
      // },
      {
        pagePath: 'pages/comic/list',
        iconPath: 'assets/tabbar/comic_inactive.png',
        selectedIconPath: 'assets/tabbar/comic_active.png',
        text: '里番漫画',
      },
      {
        pagePath: 'pages/kuaimao/player',
        iconPath: 'assets/tabbar/wandou_inactive.png',
        selectedIconPath: 'assets/tabbar/wandou_active.png',
        text: '快猫视频',
      },
      // {
      //   pagePath: 'pages/hanman/search',
      //   // iconPath: 'assets/tabbar/comic_inactive.png',
      //   // selectedIconPath: 'assets/tabbar/comic_active.png',
      //   text: '韩漫',
      // },
      {
        pagePath: 'pages/mine/history',
        iconPath: 'assets/tabbar/history_inactive.png',
        selectedIconPath: 'assets/tabbar/history_active.png',
        text: '历史记录',
      },
    ],
  },
  sitemapLocation: 'sitemap.json',
};

export default config;
