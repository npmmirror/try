import { request } from '@/util/util';
import SzyrSocket from '@/util/SzyrSocket';

/**
 * 获取直播列表
 * @returns {Promise<*>}
 */
export async function getLiveList() {
  const res = await request('/szyr/getAll');
  res.forEach((item) => {
    // eslint-disable-next-line no-param-reassign
    item.nickName = item.nickname;
  });
  return res;
}

/**
 * 获取 rtmp 播放地址
 * @param roomId {number}
 * @returns {Promise<*>}
 */
export default function getRtmpUrl(roomId) {
  return new Promise((resolve, reject) => {
    const socket = new SzyrSocket(roomId);
    let count = 0;
    socket.on('play', (url) => {
      console.log('获取到 rtmpUrl：', url);
      resolve(url);
    });
    socket.on('message', () => {
      count++;
      if (count > 30) {
        reject();
        socket.close();
      }
    });
    // socket.on('history', (data) => {
    //   console.log('历史消息：', data);
    // });
    // socket.on('chat', (data) => {
    //   console.log('收到对话消息：', data.s_name, data.msg);
    // });
  });
}
