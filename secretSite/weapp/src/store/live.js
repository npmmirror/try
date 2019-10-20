import { observable } from 'mobx';
import getRtmpUrl, { getLiveList } from '../services/live';

/*
备注一下属性值有哪些
rid：房间号
nickname：房间名
status：当前状态（1表示可以访问）
donate：需求
live_time:时长
封面图片url为https://szroot.youxuanmeijia.cn/video_rest/video/img/get_cover?uid= 加 rid
——下面是其他的一些变量，有什么用不清楚
login_source\live\mode\points\headimg
 */
const avatarHost = 'https://hd-static-1.turlock.top/video_rest/video/img/get_cover';

function getAvatar(roomId) {
  return `${avatarHost}?uid=${roomId}`;
}

const liveStore = observable({
  list: [],
  room: {},
  async getList() {
    const list = await getLiveList();
    list.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.avatar = getAvatar(item.uid);
    });
    list.sort((a, b) => b.donate - a.donate);
    this.list = list;
  },
  async setRoom(room) {
    this.room = room;
    if (room) {
      const roomId = room.rid;
      const rtmpUrl = await getRtmpUrl(roomId);
      this.room = {
        ...room,
        rtmpUrl
      };
    }
  },

  resetRoom() {
    this.room = {};
  }
});

export default liveStore;
