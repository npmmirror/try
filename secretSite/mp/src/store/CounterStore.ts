import BaseStore from '@/utils/store/BaseStore';
import { observable, action } from 'mobx';
// import { persist } from 'mobx-persist';

export default class CounterStore extends BaseStore {
  @observable
  // @persist
  counter = 0;

  @action
  increment() {
    this.counter++;
  }
  @action
  decrement() {
    this.counter--;
  }
  @action
  incrementAsync() {
    setTimeout(() => {
      this.counter++;
    }, 1000);
  }
}
