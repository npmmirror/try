window.WebSocket = window.WebSocket || window['MozWebSocket'];
let ws;
// import { Message } from 'element-ui';

export default {
    hasOpen: false,
    init(url) {
        ws = new WebSocket(url);
        ws.onmessage = res => {
            // console.log('WebSocket收到', res);
            // Message('WebSocket收到');
            this.onmessage && this.onmessage(res)
        };
        ws.onopen = () => {
            this.hasOpen = true;
            this.onopen && this.onopen();
            // console.log('WebSocket连接已打开！')
            // Message('WebSocket连接已打开');
        };
        ws.onerror = () => {
            this.onerror && this.onerror();
            // console.log('WebSocket发生错误，请检查！', e)
            // Message('WebSocket发生错误，请检查');
        };
        ws.onclose = () => {
            this.hasOpen = false;
            this.onclose && this.onclose();
            // console.log('WebSocket 已关闭！')
            // Message('WebSocket 已关闭！');
        };
    },

    onopen: null,
    onmessage: null,
    onerror: null,
    onclose: null,
    send(data) {
        if (!this.hasOpen) {
            // Message('未连接websocket');
            return;
        }
        if (typeof data !== "string")
            data = JSON.stringify(data);
        ws.send(data)
    },
    close() {
        ws.close();
    }
}