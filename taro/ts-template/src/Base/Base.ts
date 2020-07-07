import { RootStore } from '@/store';
import { Api } from '@/api';

export default class Base {
  static rootStore: RootStore;
  static api: Api;

  get store(): RootStore {
    return Base.rootStore;
  }

  get api(): Api {
    return Base.api;
  }
}
