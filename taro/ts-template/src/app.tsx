import React, { Component } from 'react';
import { Provider } from 'mobx-react';

import store from '@/store';
import '@/api'; // 引入是为了初始化 api 变量

import './app.scss';

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider {...store}>{this.props.children}</Provider>;
  }
}

export default App;
