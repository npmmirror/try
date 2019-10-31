import Taro, { Events } from '@tarojs/taro';

export default class Websocket extends Events {
  /**
   * @param url {string}
   */
  constructor(url) {
    super();
    this._connect(url);
  }

  /**
   * @type {string}
   */
  url;

  /**
   * @type {Taro.SocketTask | null}
   */
  task = null;

  isOpened = false;

  timer;

  /**
   *
   * @param url {string}
   * @returns {Promise<void>}
   * @private
   */
  async _connect(url) {
    this.url = url;
    this.task = await Taro.connectSocket({
      url
    });
    this.task.onOpen(() => this._onOpen());
    this.task.onMessage((...args) => this._onMessage(...args));
    this.task.onError((...args) => this._onError(...args));
    this.task.onClose((...args) => this._onClose(...args));
  }

  _onOpen() {
    console.log(`Websocket打开：${this.url}`);
    this.isOpened = true;
    this.timer = setInterval(() => this._heartBeat(), 5000);
    this.trigger('open');
  }

  _onMessage(msg) {
    this.trigger('message', msg);
  }

  _onError(err) {
    console.log('Websocket错误：', err);
    this.trigger('error', err);
  }

  _onClose(e) {
    this.task = null;
    this.isOpened = false;
    clearInterval(this.timer);
    if (e.code === 1000) {
      console.log('Websocket正常关闭：', e);
    } else {
      console.error('Websocket异常关闭：', e);
    }
    // 清除所有监听
    this.off();
    this.trigger('close', e);
  }

  _heartBeat() {
    if (this.isOpened) {
      this.ping();
    } else {
      clearInterval(this.timer);
    }
  }

  ping() {
  }

  /**
   * 通过 WebSocket 连接发送数据
   * @param data
   */
  async send(data) {
    if (this.isOpened) {
      await this.task.send({
        data:
          typeof data !== 'string'
            ? JSON.stringify(data)
            : data
      });
    } else {
      await Taro.showToast({
        title: '未连接websocket',
        icon: 'none'
      });
    }
  }

  /**
   * 关闭 WebSocket 连接
   */
  close(obj = { code: '0000' }) {
    if (this.task && this.isOpened) {
      this.task.close(obj);
      this.task = null;
    }
    clearInterval(this.timer);
    this.off();
  }
}
