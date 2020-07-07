import BaseStore from '@/Base/BaseStore';
import { observable, action, runInAction, computed } from 'mobx';
import { persist } from 'mobx-persist';

export default class CounterStore extends BaseStore {
  @observable
  @persist('object')
  data = {
    counter: 0,
  };

  constructor() {
    super();
    // 持久化
    this.hydrate('@persist-CounterStore');
  }

  @computed
  get counter() {
    return this.data.counter;
  }

  @action
  increment() {
    this.data.counter++;
  }
  @action
  decrement() {
    this.data.counter--;
  }
  @action
  incrementAsync() {
    setTimeout(() => {
      runInAction(() => {
        this.data.counter++;
      });
    }, 1000);
  }
}
