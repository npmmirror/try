import BaseStore from '@/utils/Base/BaseStore';
import { observable, action, runInAction } from 'mobx';
import Taro from '@tarojs/taro';

export interface ComicItem {
  comic_id: number;
  // 封面图
  cover_url: string;
  // 图片路径，替换其中的 %s 即为图片路径
  img_url_format: string;
  // 源站，目前只有源站地址为 'http://m.bzku520.com/' 的能用
  origin_host: string;
  // 是否可用
  img_url_type: string;
  // 名称
  name: string;
  // 页数
  page_number: number;
  pages: string[];
}

export default class WandouStore extends BaseStore {
  @observable
  list: ComicItem[] = [];

  @observable
  comic: ComicItem;

  @action
  async getList() {
    const list: ComicItem[] = await this.api.comic.getComicList();
    runInAction(() => {
      this.list = list
        .filter((item) => item.img_url_type)
        .filter((item) => item.origin_host === 'http://m.bzku520.com/');
    });
  }

  @action
  setComic(comic: ComicItem) {
    this.comic = comic;
    const { page_number: PageNumber, img_url_format: imgUrlFormat } = comic;
    const pages = Array.from({ length: PageNumber || 0 }).map((_, index) =>
      imgUrlFormat.replace('%s', String(index + 1)),
    );
    this.comic = {
      ...comic,
      pages,
    };
  }

  @action
  readComic(comic: ComicItem) {
    this.setComic(comic);
    Taro.navigateTo({
      url: '/pages/comic/reader',
    }).catch(() => {});
  }

  addHistory(comic: ComicItem) {
    this.store.historyStore.add({
      key: 'comic-' + comic.comic_id,
      type: 'comic',
      data: comic,
      name: comic.name,
      cover: comic.cover_url,
    });
  }
}
