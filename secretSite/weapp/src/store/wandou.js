import { observable } from 'mobx';
import { getWandouLiveList, getWandouWebsocket } from '@/services/wandou';
import WandouSocket from '@/util/WandouSocket';

const wandouStore = observable({
  list: [],
  room: {},
  socket: null,
  async getList() {
    this.list = await getWandouLiveList();
  },
  async setRoom(room) {
    const rtmpUrl = room.pull;
    this.room = {
      ...room,
      rtmpUrl
    };
    // this.connectSocket(room);
  },

  async connectSocket(room) {
    const { stream, uid } = room;
    const { url, data } = await getWandouWebsocket({
      stream,
      uid
    });
    this.socket = new WandouSocket(url, data);
    this.socket.on('close', () => {
      this.socket = null;
    });
  },

  resetRoom() {
    this.room = {};
    if (this.socket) {
      this.socket.close();
    }
  }
});

export default wandouStore;
