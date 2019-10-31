import Websocket from './Websocket';

function parseMessage(msg) {
  const match = msg.data.match(/([^[]+)(.*)/);
  const code = match[1];
  const dataStr = match[2];
  let command = null;
  let data = null;
  if (dataStr) {
    const dataObj = JSON.parse(dataStr);
    command = dataObj[0];
    data = dataObj[1][0];
  }
  return {
    code,
    command,
    data
  };
}

// 没用的那些消息类型
const msgUseLessMethodList = [
  'ActivityRed', // 抢红包相关，不弄
  'updateVotes', // 更新投票/选举？，不知道有啥用
  'BuyKeeper', // 购买守护，弃用
  'disconnect', // 某人断开连接，弃用
  'requestFans', // ？？
];

/*
收到礼物时的json
{
  "_method_": "SendGift",
  "action": "0",
  "msgtype": "1",
  "level": "10",
  "uname": "双木林丶",
  "uid": "1096819",
  "uhead": "https://static.92wandou.com/data/upload/app/avatar/20191029/06256382956573525.png",
  "evensend": "1",
  "liangname": "0",
  "vip_type": "0",
  "ct": {
    "uid": 1096819,
    "giftid": 90,
    "type": "1",
    "giftcount": 1,
    "totalcoin": 199,
    "giftname": "666",
    "gifticon": "https://static.92wandou.com/data/upload/20190613/5d01f78560070.png",
    "swftime": "10.00",
    "swftype": "1",
    "swf": "https://static.92wandou.com/data/upload/20190607/5cfa2ca732593.svga",
    "level": "10",
    "coin": "7426",
    "votestotal": "35951"
  },
  "roomnum": "1470303",
  "ifpk": "0",
  "pkuid1": "0",
  "pkuid2": "0",
  "pktotal1": "0",
  "pktotal2": "0"
}
 */

class WandouSocket extends Websocket {
  // 启动连接时发送的data
  initData = null;

  constructor(url, data) {
    super(url);
    this.initData = data;
    // setTimeout(() => {
    //   this.sendMessage();
    // }, 3000);
  }

  async _onOpen() {
    super._onOpen();
    // 打开时发送连接指令
    await this.send('2probe');
    this.once('message', async () => {
      await this.send(5);
      await this.send(42, 'conn', this.initData);
    });
  }

  async send(code, command, data) {
    const elseData = command && data
      ? JSON.stringify([command, data])
      : '';
    await super.send(`${code}${elseData}`);
  }

  _onMessage(msg) {
    super._onMessage(msg);
    const parsedMessage = parseMessage(msg);
    if (parsedMessage.data) {
      this.handleMessage(parsedMessage);
    }
  }

  handleMessage(msg) {
    switch (msg.command) {
      case 'conn':
        console.log('已连接上聊天服务器', msg);
        break;
      case 'broadcastingListen':
        this.handleBoardCast(msg.data);
        break;
      default:
        console.error('unknown command', msg.command, msg);
    }
  }

  handleBoardCast(dataStr) {
    const data = JSON.parse(dataStr);
    const msgObj = data.msg[0];
    switch (msgObj._method_) {
      // 聊天信息
      case 'SendMsg':
        this.handleSendMsg(msgObj);
        break;
      // 赠送礼物
      case 'SendGift':
        console.log('赠送礼物', msgObj);
        break;
      // 喇叭
      case 'SendHorn':
        console.log('喇叭', msgObj);
        break;
      // 系统信息
      case 'SystemNot':
        console.log('系统信息', msgObj.ct);
        break;
      // 开关播
      case 'StartEndLive':
        console.log('开关播', msgObj);
        break;
      default:
        if (!msgUseLessMethodList.includes(msgObj._method_)) {
          console.error(msgObj._method_, msgObj);
        }
        break;
    }
  }

  // 收到聊天消息：进入房间或是有人说话
  handleSendMsg(data) {
    const msgtype = data.msgtype;
    let _msg = '';
    if (msgtype === '0') {
      const userName = data.ct.user_nicename;
      // 不是游客的话显示一下用户吧，游客就算了
      // if (!/手机用户\d{7}/.test(userName)) {
      _msg = `${userName}：进入房间`;
      // }
    } else if (msgtype === '2') {
      _msg = `${data.uname}说：${data.ct}`;
    }
    _msg && console.log(_msg);
  }

  ping() {
    this.send(2);
  }

  sendMessage() {
    this.send(
      42,
      'broadcast',
      JSON.stringify({
        msg: [{
          _method_: 'SendMsg',
          action: 0,
          ct: '？',
          msgtype: '2',
          tougood: '',
          touid: '',
          touname: '',
          ugood: '1372960',
          uid: '1372960',
          uname: 'WEB用户4121',
          level: '2',
          vip_type: '0',
          liangname: '0',
          usertype: '30',
          guard_type: '0'
        }],
        retcode: '000000',
        retmsg: 'OK'
      })
    );
  }
}

export default WandouSocket;
