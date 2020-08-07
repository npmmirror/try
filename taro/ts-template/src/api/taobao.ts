import BaseApi from '@/Base/BaseApi';

export default class TaobaoApi extends BaseApi {
  /**
   * 查询淘宝推荐商品
   * @param q 查询关键字
   */
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
