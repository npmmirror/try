import WandouApi from '@/api/WandouApi';
import Base from '@/utils/Base/Base';
import ComicApi from '@/api/ComicApi';

export class Api {
  wandou = new WandouApi();
  comic = new ComicApi();
}

const api = (Base.api = new Api());

export default api;
