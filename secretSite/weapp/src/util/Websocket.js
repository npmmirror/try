import Taro, { Events } from '@tarojs/taro';

export default class Websocket extends Events {
  /**
   * @param url {string}
   */
  constructor(url) {
    super();
    this._connect(url);
    this.timer = setInterval(() => this._heartBeat(), 5000);
  }

  /**
   * @type {string}
   */
  url;

  /**
   * @type {Taro.SocketTask | null}
   */
  task = null;

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
    this.trigger('open');
  }

  _onMessage(msg) {
    this.trigger('message', msg);
  }

  _onError(err) {
    console.log('Websocket错误：', err);
    this.trigger('error', err);
  }

  _onClose(...args) {
    console.log('Websocket已关闭：', ...args);
    this.trigger('close', ...args);
  }

  _heartBeat() {
    if (this.task) {
      this.send(JSON.stringify({
        cmd: 19209
      }));
    } else {
      clearInterval(this.timer);
    }
  }

  /**
   * 通过 WebSocket 连接发送数据
   * @param data
   */
  async send(data) {
    if (this.task) {
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
  close() {
    if (this.task) {
      this.task.close({});
      this.task = null;
    }
    clearInterval(this.timer);
    this.off();
  }
}
