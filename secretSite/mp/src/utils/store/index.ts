import CounterStore from '@/store/CounterStore';

export class RootStore {
  counterStore = new CounterStore(this);
}

const store = new RootStore();

export default store;
