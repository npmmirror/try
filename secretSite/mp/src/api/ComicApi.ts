import BaseApi from '@/utils/Base/BaseApi';
import request from '@/utils/request';

export default class ComicApi extends BaseApi {
  getComicList(limit = 100) {
    return request(`/comic/getList?limit=${limit}`);
  }
}
