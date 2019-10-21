import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './list.less';

@inject('comicStore', 'historyStore')
@observer
class ComicList extends Component {
  config = {
    navigationBarTitleText: '里番漫画',
    enablePullDownRefresh: true,
  };

  componentDidMount() {
    this.getList();
  }

  getList() {
    const { comicStore } = this.props;
    return comicStore.getList();
  }

  handleClick = (comic) => {
    const { comicStore, historyStore } = this.props;
    comicStore.setComic(comic);
    historyStore.addHistory({
      type: 'comic',
      name: comic.name,
      cover: comic.cover_url,
      data: comic
    });
    Taro.navigateTo({
      url: '/pages/comic/reader'
    });
  };

  onPullDownRefresh() {
    this.getList()
      .then(Taro.stopPullDownRefresh)
      .catch(Taro.stopPullDownRefresh);
  }

  render() {
    const list = this.props.comicStore.list;
    return (
      <View className='wrap'>
        {
          list.map((item) => (
            <View key={item.comic_id} className='comic-item' onClick={() => this.handleClick(item)}>
              <Image
                className='comic-item__cover'
                mode='aspectFill'
                src={item.cover_url}
              />
              <View className='comic-item__name'>{item.name}</View>
            </View>
          ))
        }
      </View>
    );
  }
}

export default ComicList;
