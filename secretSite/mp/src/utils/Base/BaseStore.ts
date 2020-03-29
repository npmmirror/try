import { hydrate } from '@/utils/storage';
import Base from '@/utils/Base/Base';

export default class BaseStore extends Base {
  hydrate(persistKey) {
    hydrate(persistKey, this).catch(() => {});
  }
}
