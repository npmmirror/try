import Websocket from './Websocket';

const websocketHost = 'wss://wslgr.xue998.com/bar_chat/-1_';
let rtmpHost = 'rtmp://bgp209-pull2.ituiguang.top/live';

const whiteList = [
  159213,
  19213,

  // ServerListPlay 另一个有房间信息的命令，但是不用
  39211
];
const blockList = [
  // 用户进入房间
  21213,
  // 用户离开房间
  21215,
  // 房管列表？
  27211,
  // ServerRoomUserList 房间用户列表？
  21211,
  // ServerListRoom 其他直播房间
  99211,
  // 莫名其妙的其他房间的信息
  19233,
  // ServerChat 对话消息
  59213,
  // ListServerChat 历史消息
  59221,
  // ServerBhtScore
  109219,
  // ServerBroadChat 全体广播
  59215,
  // Ping
  19209
].concat(whiteList);

class SzyrSocket extends Websocket {
  /**
   * @type {number}
   */
  roomId;

  /**
   *
   * @param roomId {SzyrSocket.roomId}
   */
  constructor(roomId) {
    super(websocketHost + roomId);
    this.roomId = roomId;
  }

  _onMessage(msg) {
    super._onMessage(msg);
    try {
      const d = JSON.parse(msg.data);
      if (!blockList.includes(d.cmd)) console.warn('Websocket收到：', d.className, d.cmd, JSON.parse(d.content), d);
    } catch (e) {
      //
    }
    const msgData = JSON.parse(msg.data);
    /*
      这个时候得到了某一条message的内容通过parse转换得到的对象
      里面包含了
      content（一个string，通过JSON.parse可以转换成对象）
      className，：一个string，表示本次操作的类型（可能是本来用于作为消息的样式类名？）
      cmd：命令的代码，含有rtmp信息的代码为159213，含有sid的代码为19213
    */

    const { cmd, content } = msgData;
    const msgContent = JSON.parse(content);

    switch (cmd) {
      // 159213 中有rtmp地址 格式为rtmp://xxx.xxx
      case 159213:
        rtmpHost = msgContent.rtmp;
        if (rtmpHost.indexOf(',') !== -1) {
          rtmpHost = rtmpHost.split(',')[0];
        }
        break;

      // 19213 中有推流码 格式为 lexxx
      case 19213:
        this.send(JSON.stringify({
          cmd: 39211
        }));
        this.send(JSON.stringify({
          cmd: 21211,
          start: 0,
          end: 10
        }));
        this.send(JSON.stringify({
          cmd: 27211
        }));
        if (msgContent.sid) {
          msgContent.sid && this.play(msgContent.sid);
        }
        break;

      // 有时也在 39217 中有推流码
      case 39217:
        msgContent.sid && this.play(msgContent.sid);
        break;

      // 历史消息
      case 59221:
        this.trigger('history', msgContent);
        break;

      // 聊天消息
      case 59213:
        this.trigger('chat', msgContent);
        break;

      default:
        break;
    }
  }

  play(sid) {
    const rtmpUrl = `${rtmpHost}/${sid}`;
    this.trigger('play', rtmpUrl);
  }
}

export default SzyrSocket;
