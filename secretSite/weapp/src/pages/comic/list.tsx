import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import ComicStore from '@/store/ComicStore';
import './list.less';

interface PageProps {
  comicStore: ComicStore;
}

@inject('comicStore')
@observer
class ComicList extends Component<PageProps> {
  config = {
    navigationBarTitleText: '里番漫画',
    enablePullDownRefresh: true,
  };

  componentDidMount() {
    this.getList().catch(() => {});
  }

  getList() {
    const { comicStore } = this.props;
    return comicStore.getList();
  }

  handleClick = async (comic) => {
    const { comicStore } = this.props;
    comicStore.readComic(comic);
    comicStore.addHistory(comic);
  };

  onPullDownRefresh() {
    this.getList()
      .then(() => {
        Taro.stopPullDownRefresh();
      })
      .catch(Taro.stopPullDownRefresh);
  }

  render() {
    const list = this.props.comicStore.list;
    return (
      <View className='wrap'>
        {list.map((item) => (
          <View
            key={item.comic_id}
            className='comic-item'
            onClick={() => this.handleClick(item)}
          >
            <Image
              className='comic-item__cover'
              mode='aspectFill'
              src={item.cover_url}
            />
            <View className='comic-item__name'>{item.name}</View>
          </View>
        ))}
      </View>
    );
  }
}

export default ComicList;
