import React, { Component } from 'react';
import { View, Button, Text, Input, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import CounterStore from '@/store/counter';
import TaobaoStore from '@/store/taobao';
import { observable, action } from 'mobx';
import coverImage from '@/assets/cover.jpg';
import consts from '@/consts';
import Banner from '@/components/banner';
import Card from '@/components/card';
import sdk from '@/sdk';

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

  componentDidMount() {
    sdk.emit('ready');
  }

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
        <View>
          {taobao.list.length > 0
            ? taobao.list.map((item) => (
                <View key={item[0]}>
                  {item[0]}
                  {item[1]}
                </View>
              ))
            : '列表空空如也'}
        </View>
        <View>
          <View>枚举值：</View>
          <View>
            列举所有枚举：
            {consts.hello.IdType.enumValues.map((item) => (
              <View key={item.enumKey}>
                {item.label}：{item.value}
              </View>
            ))}
          </View>
          <View>
            获取单个枚举：
            <View>
              {consts.hello.IdType.passport.label}：{consts.hello.IdType.passport.value}
            </View>
          </View>
          <View>
            根据 value 渲染 label：
            <View>{consts.hello.IdType.renderByValue('01')}</View>
          </View>
          <View>
            枚举自定义静态方法 static canUse(value)：
            <View>{consts.hello.IdType.canUse('01') ? '是' : '否'}</View>
          </View>
          <View>
            枚举自定义成员方法 getLevel()
            <View>passport.level：{consts.hello.IdType.passport.getLevel()}</View>
          </View>
        </View>
        <View>
          组件库：
          <Banner />
          <Card
            noHeaderBorder
            isFull
            note='点击即可上传, 照片文件大小在1024k以内'
            title='上传证件照片'
          >
            <View>我是内容</View>
          </Card>
        </View>
      </View>
    );
  }
}

export default Index;
