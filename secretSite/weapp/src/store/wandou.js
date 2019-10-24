import { observable } from 'mobx';
import { getWandouLiveList } from '../services/wandou';

const wandouStore = observable({
  list: [],
  room: {},
  async getList() {
    this.list = await getWandouLiveList();
  },
  async setRoom(room) {
    const rtmpUrl = room.pull;
    this.room = {
      ...room,
      rtmpUrl
    };
  },

  resetRoom() {
    this.room = {};
  }
});

export default wandouStore;
