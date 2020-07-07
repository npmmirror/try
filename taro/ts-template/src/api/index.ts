import Base from '@/Base/Base';
import TaobaoApi from './taobao';

export class Api {
  taobao = new TaobaoApi();
}

const api = (Base.api = new Api());

export default api;
