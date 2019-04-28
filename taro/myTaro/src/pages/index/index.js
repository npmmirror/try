import Taro, { Component } from '@tarojs/taro';
import { View, Image, Input, Form, Button } from '@tarojs/components';
import './index.scss';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '众家毒文案',
    navigationBarBackgroundColor: '#EC6631'
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
      url: `/pages/painter/index?corpName=${data.corpName}&major=${data.major}`
    });
  };

  render() {
    return (
      <View className='container'>
        <View className='title'>
          {/* <View className='title__content'>快来查看你的毒文案</View> */}
          <Image className='image image__2019' src='../../images/2019.png' />
          <Image className='image image__text' src='../../images/text.png' />
          <Image className='image image__quill' src='../../images/quill.png' />
        </View>
        <View className='operation'>
          <Form onSubmit={this.handleSubmit}>
            <View className='input-item'>
              <View className='input-item__label'>
                输入您的公司名称 (*^▽^*)
              </View>
              <Input
                className='input-item__input'
                name='corpName'
                placeholder='如：慕思'
                placeholderClass='input-item__input--placeholder'
              />
            </View>
            <View className='input-item'>
              <View className='input-item__label'>输入您的主营产品</View>
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
              生成
            </Button>
          </Form>
        </View>
      </View>
    );
  }
}
