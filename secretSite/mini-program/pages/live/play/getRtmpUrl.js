//这个函数用于获得已知房间号的 rtmp 地址
const ws = require('../../../utils/websocket.js');
module.exports = function get_rtmp_url(room_id) {
    return new Promise((resolve, reject) => {
      const base_url = 'wss://wslgr.xue998.com/bar_chat/-1_';
      const ws_url = base_url + room_id;
      let rtmp_host = 'rtmp://bgp209-pull2.ituiguang.top/live';
      let count = 0;
      ws.init(ws_url);
      ws.onmessage = function (res) {
        const msgData = JSON.parse(res.data);
        /*
          这个时候得到了某一条message的内容通过parse转换得到的对象
          里面包含了
          content（一个string，通过JSON.parse可以转换成对象）
          className，：一个string，表示本次操作的类型（可能是本来用于作为消息的样式类名？）
          cmd：命令的代码，含有rtmp信息的代码为159213，含有sid的代码为19213
        */
        const msgContent = JSON.parse(msgData["content"]);
        //159213中有rtmp地址 格式为rtmp://xxxxxxx.xxxx
        if (msgData["cmd"] === 159213) {
          rtmp_host = msgContent["rtmp"];
          if(rtmp_host.indexOf(',') !== -1){
            rtmp_host = rtmp_host.split(',')[0];
          }
        }
        //19213中有推流码 格式为lexxxxxx
        if (msgData["cmd"] === 19213) {
          ws.send(JSON.stringify({
            cmd: 39211
          }));
          ws.send(JSON.stringify({
            cmd: 21211,
            start: 0,
            end: 10
          }));
          ws.send(JSON.stringify({
            cmd: 27211
          }));
          const sid = msgContent.sid;
          if (!sid) return;
          const rtmpUrl = rtmp_host + '/' + sid;
          resolve(rtmpUrl);
          ws.close();
        }
        if (msgData['cmd'] === 39217) {
          let sid = msgContent["sid"]
          if (sid) {
            ws.close();
            resolve(rtmp_host + "/" + sid)
          }
        }
        if (count > 10) {
          ws.close();
          reject("获取播放地址失败");
        }
        count++;
      };
    })
  }