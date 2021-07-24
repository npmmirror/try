import Taro from '@tarojs/taro';
import { Component } from 'react';
import { Image, Input, View } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import HanmanStore from '@/store/HanmanStore';
import './search.less';

interface PageProps {
  hanmanStore: HanmanStore;
}

@inject('hanmanStore')
@observer
class HanmanSearch extends Component<PageProps> {
  componentDidMount(): void {
    const { hanmanStore } = this.props;
    hanmanStore.search('家政').catch(() => {});
  }

  onSearch = (e) => {
    const keyword = e.detail.value;
    const { hanmanStore } = this.props;
    hanmanStore.search(keyword).catch(() => {});
  };

  handleClickComic = (comic) => {
    const { hanmanStore } = this.props;
    hanmanStore.setComic(comic).catch(() => {});
  };

  handleClickChapter = (chapter) => {
    const { hanmanStore } = this.props;
    hanmanStore.setChapter(chapter).catch(() => {});
    Taro.navigateTo({
      url: '/pages/hanman/read',
    }).catch(() => {});
  };

  render() {
    const {
      hanmanStore: { searchResultList, chapterList },
    } = this.props;
    return (
      <View>
        <Input onConfirm={this.onSearch} />
        <View className='list'>
          {searchResultList.map((item) => (
            <View
              className='item'
              key={item.comicId}
              onClick={this.handleClickComic.bind(this, item)}
            >
              <View>{item.title}</View>
              <Image src={item.imgUrl} />
            </View>
          ))}
        </View>
        <View className='list'>
          {chapterList.map((item) => (
            <View
              className='item'
              key={item.chapterId}
              onClick={this.handleClickChapter.bind(this, item)}
            >
              <View>{item.title || `第 ${item.seq} 话`}</View>
              <Image src={item.imgUrl} />
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default HanmanSearch;
