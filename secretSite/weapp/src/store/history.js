import { observable } from 'mobx';
import Taro from '@tarojs/taro';
import { formatTime } from '@/util/util';


const typeMap = {
  comic: {
    name: '里番漫画'
  },
  video: {
    name: '岛国电影'
  }
};

function getTypeName(type) {
  return (typeMap[type] || {}).name || '';
}

const historyStore = observable({
  list: Taro.getStorageSync('history') || [],
  addHistory({
    type, cover, name, data
  }) {
    const id = Date.now();
    this.list.push({
      id,
      date: formatTime(new Date()),
      typeName: getTypeName(type),
      name,
      type,
      cover,
      data
    });
    this.persistList();
  },
  removeHistory(id) {
    const index = this.list.findIndex((item) => item.id === id);
    this.list.splice(index, 1);
    this.persistList();
  },
  clearHistory() {
    this.list = [];
    this.persistList();
  },
  persistList() {
    Taro.setStorageSync('history', this.list);
  }
});

export default historyStore;
