import WandouApi from '@/api/WandouApi';
import Base from '@/utils/Base/Base';
import ComicApi from '@/api/ComicApi';
import HanmanApi from '@/api/HanmanApi';

export class Api {
  wandou = new WandouApi();
  comic = new ComicApi();
  hanMan = new HanmanApi();
}

const api = (Base.api = new Api());

export default api;
