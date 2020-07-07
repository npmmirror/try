import BaseStore from '@/Base/BaseStore';
import { observable, action, runInAction } from 'mobx';
import { persist } from 'mobx-persist';

type ListItem = [string, string];

export default class TaobaoStore extends BaseStore {
  @observable
  @persist('object')
  data = {
    search: '', // 搜索关键词
  };

  @observable
  @persist('list')
  list: Array<ListItem> = []; // 搜索结果列表

  constructor() {
    super();
    // 持久化
    this.hydrate('@persist-TaobaoStore');
  }

  @action
  clearList() {
    this.list = [];
    this.data.search = '';
  }

  async getSuggest(search: string) {
    const res = await this.api.taobao.getSuggest(search);
    const list = res.result;
    runInAction(() => {
      this.data.search = search;
      this.list = list;
    });
    return list;
  }
}
