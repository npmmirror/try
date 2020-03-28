import CounterStore from '@/store/CounterStore';
import BaseStore from '@/utils/store/BaseStore';
import { configure } from 'mobx';

export class RootStore {
  counterStore = new CounterStore();
}

const store = (BaseStore.rootStore = new RootStore());

// 强制要求在 action 内修改 state
// 放在 persist 后面避免报错
configure({ enforceActions: 'always' });

export default store;
