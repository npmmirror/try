import Base from '@/utils/Base/Base';
import { configure } from 'mobx';
import WandouStore from '@/store/WandouStore';
import ComicStore from '@/store/ComicStore';
import HistoryStore from '@/store/HistoryStore';
import HanmanStore from '@/store/HanmanStore';

export class RootStore {
  wandouStore = new WandouStore();
  comicStore = new ComicStore();
  historyStore = new HistoryStore();
  hanmanStore = new HanmanStore();
}

const store = (Base.rootStore = new RootStore());

// 强制要求在 action 内修改 state
// 放在 persist 后面避免报错
configure({ enforceActions: 'always' });

export default store;
