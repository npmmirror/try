import BaseStore from '@/Base/BaseStore';
import { observable, action, runInAction, computed } from 'mobx';
import { persist } from 'mobx-persist';

export default class CounterStore extends BaseStore {
  @observable
  @persist('object')
  data = {
    /**
     * 计数器
     */
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

  /**
   * counter 增加 1
   */
  @action
  increment() {
    this.data.counter++;
  }
  /**
   * counter 减少 1
   */
  @action
  decrement() {
    this.data.counter--;
  }
  /**
   * 异步操作：1s 后 counter 增加 1
   */
  @action
  incrementAsync() {
    setTimeout(() => {
      runInAction(() => {
        this.data.counter++;
      });
    }, 1000);
  }
}
