import Base from '@/Base/Base';
import { configure } from 'mobx';
import config from '@/config';
import CounterStore from './counter';
import TaobaoStore from './taobao';
import userStore from './user';

export class RootStore {
  counter = new CounterStore();
  taobao = new TaobaoStore();
  userStore = userStore; // 旧版迁移
}

const store = (Base.rootStore = new RootStore());

// 强制要求在 action 内修改 state
// 放在 persist 后面避免报错
if (config.enforceActions) {
  configure({ enforceActions: 'always' });
}

export default store;
