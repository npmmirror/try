import BaseStore from '@/utils/Base/BaseStore';
import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import { ComicItem } from '@/store/ComicStore';

interface HistoryType {
  // 漫画
  comic: 'comic';
}

type HistoryData = ComicItem;

interface HistoryItem {
  // 唯一标识，如果重复了会删除旧的
  key: string;
  // 类型
  type: keyof HistoryType;
  // 保存的数据
  data: HistoryData;
  // 展示在历史记录列表里的封面
  cover: string;
  // 展示在历史记录列表里的标题
  name: string;
}

export interface HistoryListItem extends HistoryItem {
  // 默认为 Date.now()
  id: number;
  // ISO 格式日期
  date: string;
}

export default class HistoryStore extends BaseStore {
  @observable
  @persist('list')
  list: HistoryListItem[] = [];

  constructor() {
    super();
    this.hydrate('@persist-historyStore');
  }

  @action
  add(history: HistoryItem) {
    const index = this.list.findIndex((item) => item.key === history.key);
    this.list.splice(index, 1);
    this.list.push({
      id: Date.now(),
      date: new Date().toISOString(),
      ...history,
    });
  }

  @action
  remove(id: number) {
    const index = this.list.findIndex((item) => item.id === id);
    this.list.splice(index, 1);
  }

  @action
  clear() {
    this.list = [];
  }
}
