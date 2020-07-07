import { hydrate } from '@/utils/storage';
import Base from './Base';

export default class BaseStore extends Base {
  // 持久化当前 store
  hydrate(persistKey: string) {
    hydrate(persistKey, this).catch(() => {});
  }
}
