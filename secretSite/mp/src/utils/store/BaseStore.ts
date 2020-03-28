import { RootStore } from '@/utils/store/index';

export default class BaseStore {
  getRootStore: () => RootStore;

  constructor(rootStore: RootStore) {
    this.getRootStore = () => rootStore;
  }
}
