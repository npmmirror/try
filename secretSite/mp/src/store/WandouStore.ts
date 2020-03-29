import BaseStore from '@/utils/Base/BaseStore';
import { observable, action, runInAction } from 'mobx';
import Taro from '@tarojs/taro';

export interface WandouLiveItem {
  uid: string;
  // 标题
  title: string;
  // 用户名？
  user_nicename: string;
  // rtmp 视频流源地址
  pull: string;
  // 封面？
  thumb: string;
  // 头像？
  avatar: string;
  // type !== 0 代表是收费房间
  type: number;
}

export default class WandouStore extends BaseStore {
  @observable
  list: WandouLiveItem[] = [];

  @observable
  room: WandouLiveItem | null = null;

  @action
  async getList() {
    const list = await this.api.wandou.getLiveList();
    runInAction(() => {
      this.list = list;
    });
  }

  @action
  setRoom(room: WandouLiveItem) {
    this.room = room;
  }

  playRoom(room: WandouLiveItem) {
    this.setRoom(room);
    Taro.navigateTo({
      url: '/pages/wandou/play',
    }).catch(() => {});
  }
}
