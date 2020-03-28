import Taro from '@tarojs/taro';
import { create } from 'mobx-persist';

const storage = {
  getItem(key) {
    return Taro.getStorage({ key }).then((res) => res.data);
  },
  setItem(key, data) {
    return Taro.setStorage({ key, data });
  },
};

const sessionStorage = {};

const hydrate = create({
  storage,
  debounce: 20,
  jsonify: false,
});

export { storage, sessionStorage, hydrate };
