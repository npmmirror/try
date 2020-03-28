import { RootStore } from '@/utils/store/index';
import { hydrate } from '@/utils/storage';

export default class BaseStore {
  static rootStore: RootStore;

  getRootStore(): RootStore {
    return BaseStore.rootStore;
  }

  hydrate(persistKey) {
    hydrate(persistKey, this).catch(() => {});
  }
}
