import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './reader.less';

@inject('comicStore')
@observer
class ComicReader extends Component {
  config = {
    navigationBarTitleText: '漫画',
  };

  componentDidMount() {
    const { comicStore: { comic } } = this.props;
    if (comic.name) {
      Taro.setNavigationBarTitle({
        title: comic.name
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { comicStore: { comic } } = this.props;
    const { comicStore: { comic: prevComic } } = prevProps;
    if (comic.name !== prevComic.name) {
      Taro.setNavigationBarTitle({
        title: comic.name
      });
    }
  }

  render() {
    const { comic } = this.props.comicStore;
    return (
      <View className='wrap'>
        {
          comic.pages.map((url, index) => (
            <View key={url} className='img'>
              <Image
                mode='aspectFit'
                lazyLoad
                src={url}
              />
              <View className='index'>
                {index + 1}
                /
                {comic.page_number}
              </View>
            </View>
          ))
        }
      </View>
    );
  }
}

export default ComicReader;
