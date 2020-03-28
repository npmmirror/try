import BaseStore from '@/utils/store/BaseStore';
import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

export default class CounterStore extends BaseStore {
  @observable
  @persist('object')
  data = {
    counter: 0,
  };

  constructor() {
    super();
    this.hydrate('@persist-counterStore');
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
      this.increment();
    }, 1000);
  }
}
