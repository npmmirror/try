import BaseApi from '@/utils/Base/BaseApi';
import { WandouLiveItem } from '@/store/WandouStore';

export default class WandouApi extends BaseApi {
  /**
   * 获取豌豆直播列表
   */
  getLiveList(): Promise<WandouLiveItem[]> {
    return this.request('/wandou/getList', {
      cache: true,
      expires: 5000,
    });
  }
}
