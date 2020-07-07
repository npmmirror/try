import Base from '@/Base/Base';
import { configure } from 'mobx';
import CounterStore from './counter';
import TaobaoStore from './taobao';

export class RootStore {
  counter = new CounterStore();
  taobao = new TaobaoStore();
}

const store = (Base.rootStore = new RootStore());

// 强制要求在 action 内修改 state
// 放在 persist 后面避免报错
configure({ enforceActions: 'always' });

export default store;
