import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import ComicStore from '@/store/ComicStore';
import './reader.less';

interface PageProps {
  comicStore: ComicStore;
}

@inject('comicStore')
@observer
class ComicReader extends Component<PageProps> {
  config = {
    navigationBarTitleText: '漫画',
  };

  async componentDidMount() {
    const {
      comicStore: { comic },
    } = this.props;
    if (comic && comic.name) {
      await Taro.setNavigationBarTitle({
        title: comic.name,
      });
    }
  }

  render() {
    const { comic } = this.props.comicStore;
    return (
      <View className="wrap">
        {comic.pages.map((url, index) => (
          <View key={url} className="img">
            <Image className="img__image" mode="aspectFit" lazyLoad src={url} />
            <View className="index">
              {index + 1}/{comic.page_number}
            </View>
          </View>
        ))}
      </View>
    );
  }
}

export default ComicReader;
