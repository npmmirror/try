import React, { Component } from 'react';
import { View, Button, Text, Input, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import CounterStore from '@/store/counter';
import TaobaoStore from '@/store/taobao';
import { observable, action } from 'mobx';
import coverImage from '@/assets/cover.jpg';

import './index.scss';

interface PageProps {
  counter: CounterStore;
  taobao: TaobaoStore;
}

@inject('counter', 'taobao')
@observer
class Index extends Component<PageProps> {
  @observable
  data = {
    search: '',
  };

  increment = () => {
    const { counter } = this.props;
    counter.increment();
  };

  decrement = () => {
    const { counter } = this.props;
    counter.decrement();
  };

  incrementAsync = () => {
    const { counter } = this.props;
    counter.incrementAsync();
  };

  getSuggest = async () => {
    const { taobao } = this.props;
    const { search } = this.data;
    taobao.getSuggest(search);
  };

  @action
  handleInput = (e) => {
    const { taobao } = this.props;
    taobao.clearList();
    const value = e.detail.value;
    this.data.search = value || '';
  };

  render() {
    const { counter, taobao } = this.props;
    const { search } = this.data;
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter.counter}</Text>
        <View className='cover__wrapper'>
          <Image src={coverImage} className='cover' />
        </View>
        <Input
          value={search}
          onInput={this.handleInput}
          onConfirm={this.getSuggest}
          placeholder='在此输入搜索关键词'
        />
        <Button onClick={this.getSuggest}>调用 API 查询商品</Button>
        <View style={{ color: 'red' }}>搜索关键词：{taobao.data.search}</View>
        {taobao.list.length > 0
          ? taobao.list.map((item) => (
              <View key={item[0]}>
                {item[0]}
                {item[1]}
              </View>
            ))
          : '列表空空如也'}
      </View>
    );
  }
}

export default Index;
