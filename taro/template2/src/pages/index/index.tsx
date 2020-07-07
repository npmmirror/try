import React, { Component } from 'react';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from 'mobx-react';

import './index.scss';

interface PageStateProps {
  store: {
    counterStore: {
      counter: number;
      increment: Function;
      decrement: Function;
      incrementAsync: Function;
    };
  };
}

// interface Index {
//   props: PageStateProps;
// }

@inject('store')
@observer
class Index extends Component<PageStateProps> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  increment = () => {
    const {
      store: { counterStore },
    } = this.props;
    counterStore.increment();
  };

  decrement = () => {
    const {
      store: { counterStore },
    } = this.props;
    counterStore.decrement();
  };

  incrementAsync = () => {
    const {
      store: { counterStore },
    } = this.props;
    counterStore.incrementAsync();
  };

  render() {
    const {
      store: {
        counterStore: { counter },
      },
    } = this.props;
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
      </View>
    );
  }
}

export default Index;
