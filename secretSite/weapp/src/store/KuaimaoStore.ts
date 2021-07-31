import BaseStore from '@/utils/Base/BaseStore';
import { observable, runInAction } from 'mobx';
import Taro from '@tarojs/taro';
import { persist } from 'mobx-persist';
import CryptoJS from 'crypto-js';

function aesDecrypt(data, aesKey = '46cc793c53dc451b') { //解密
  if (data.length < 1) {
    return '';
  }
  const key = CryptoJS.enc.Utf8.parse(aesKey);
  const decrypt = CryptoJS.AES.decrypt(data, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr;
}

function decryptResponse(res) {
  if (typeof res.data === 'string') {
    const jsonData = JSON.parse(aesDecrypt(res.data));
    // console.log('解密后', jsonData);
    res.data = jsonData;
  }
}

type RequestParamType = {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'head';
  [key: string]: any;
}

async function doRequest(opt: RequestParamType) {
  const res: any = await Taro.cloud.callFunction({
    name: 'request',
    data: opt
  });
  return res.result;
}

type User = {
  email: string;
  userId: number;
  token: string;
  expire: number;
}

export default class KuaimaoStore extends BaseStore {

  constructor() {
    super();
    this.hydrate('@persist-historyStore');
  }

  @observable
  @persist('object')
  userInfo: User | null = null;

  async getToken() {
    if (this.userInfo && this.userInfo?.expire > Date.now()) {
      return this.userInfo.token;
    }
    try {
      const res = await doRequest({
        url: 'https://api.lzafny.com/user/login',
        method: 'post',
        data: {
          'clientType': 1,
          'userName': '222@qqq.com',
          'password': '1q2w3e4r5t'
        }
      });
      decryptResponse(res);
      const userInfo: User = res.data;
      // const str = CryptoJS.enc.Base64.parse(userInfo.token).toString(CryptoJS.enc.Utf8);
      // userInfo.expire = parseInt(str.split('|')[2]);
      userInfo.expire = Date.now() + 2 * 3600 * 1000;
      runInAction(() => {
        this.userInfo = userInfo;
      });
      return userInfo.token;
    } catch (e) {
      console.error(e);
    }
  }

  async getVideoUrl(videoId: string | number) {
    const token = await this.getToken();
    const res = await doRequest({
      url: 'https://api.lzafny.com/video/getUrl',
      method: 'post',
      headers: {
        token
      },
      data: {
        clientType: 1,
        videoId: videoId
      }
    });
    decryptResponse(res);
    console.log('getVideoUrl', res.data);
    return res.data;
  }

  async getVideoInfo(videoId: number) {
    const res = await doRequest({
      url: 'https://api.lzafny.com/video/getInfo',
      method: 'post',
      data: {
        clientType: 1,
        videoId: videoId
      }
    });
    decryptResponse(res);
    console.log('getVideoInfo', res.data);
    return res.data;
  }

  // @observable
  // list: WandouLiveItem[] = [];
  //
  // @observable
  // room: WandouLiveItem | null = null;
  //
  // @action
  // async getList() {
  //   console.log('getList333');
  //   const list = await this.api.wandou.getLiveList();
  //   console.log('getList444');
  //   runInAction(() => {
  //     this.list = list;
  //   });
  // }
  //
  // @action
  // setRoom(room: WandouLiveItem) {
  //   this.room = room;
  // }
  //
  // playRoom(room: WandouLiveItem) {
  //   this.setRoom(room);
  //   Taro.navigateTo({
  //     url: '/pages/wandou/play',
  //   }).catch(() => {});
  // }
}
