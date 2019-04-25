import Taro, { Component } from '@tarojs/taro';
import { View, Input, Form, Button } from '@tarojs/components';
import './index.scss';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleSubmit = e => {
    const data = e.detail.value;
    if (!data.corpName || !data.major) {
      Taro.showToast({
        title: '你不填我怎么生成呢？',
        icon: 'none'
      });
      return;
    }
    Taro.navigateTo({
      url: `/pages/index/index?corpName=${data.corpName}&major=${data.major}`
    });
  };

  render() {
    return (
      <View className='container'>
        <View className='title'>
          <View className='title__content'>快来查看你的毒文案</View>
        </View>
        <View className='operation'>
          <Form onSubmit={this.handleSubmit}>
            <View className='input-item'>
              <View className='input-item__label'>企业名称</View>
              <Input
                className='input-item__input'
                name='corpName'
                placeholder='如：慕思'
                placeholderClass='input-item__input--placeholder'
              />
            </View>
            <View className='input-item'>
              <View className='input-item__label'>主营</View>
              <Input
                className='input-item__input'
                name='major'
                placeholder='如：床垫'
                placeholderClass='input-item__input--placeholder'
              />
            </View>
            <Button
              type='primary'
              className='operation__button'
              formType='submit'
            >
              提交
            </Button>
          </Form>
        </View>
      </View>
    );
  }
}
