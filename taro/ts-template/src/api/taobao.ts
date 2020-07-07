import BaseApi from '@/Base/BaseApi';

export default class TaobaoApi extends BaseApi {
  getSuggest(q: string) {
    return this.request({
      url: 'https://suggest.taobao.com/sug',
      data: {
        code: 'utf-8',
        q,
      },
    });
  }
}
