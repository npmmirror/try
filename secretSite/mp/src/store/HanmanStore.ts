import BaseStore from '@/utils/Base/BaseStore';
import { action, observable, runInAction } from 'mobx';

type HanmanItem = any;
type HanmanChapterItem = any;
type HanmanPageItem = any;

export default class HanmanStore extends BaseStore {
  @observable
  searchResultList: HanmanItem[] = [];

  @observable
  comic: HanmanItem;
  @observable
  chapterList: HanmanChapterItem[] = [];
  @observable
  chapterPages: HanmanPageItem[] = [];

  async search(keyword: string) {
    const res = await this.api.hanMan.search(keyword);
    const list = res.data.comicList;
    runInAction(() => {
      this.searchResultList = list;
    });
  }

  @action
  async setComic(comic: HanmanItem) {
    const { comicId } = comic;
    this.comic = comic;
    const res = await this.api.hanMan.getChapterList(comicId);
    runInAction(() => {
      this.chapterList = res.data.comicBaseInfo.comicChapterList;
    });
  }

  @action
  async setChapter(chapter: HanmanChapterItem) {
    const { chapterId } = chapter;
    const res = await this.api.hanMan.getChapterContent(chapterId);
    runInAction(() => {
      this.chapterPages = res.data.chapterContentList;
    });
  }

}
