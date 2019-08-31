module.exports = {
  hasOpen:false,
  init(url){
    wx.connectSocket({ url })
    wx.onSocketMessage(res => {
      console.log('WebSocket收到', res)
      this.onmessage && this.onmessage(res)
    })
    wx.onSocketOpen(()=>{
      this.hasOpen = true;
      this.onopen && this.onopen()
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketError(function (e) {
      this.onerror && this.onerror()
      console.log('WebSocket发生错误，请检查！', e)
    })
    wx.onSocketClose((res)=>{
      this.hasOpen = false;
      this.onclose && this.onclose()
      console.log('WebSocket 已关闭！')
    })
  },
  
  onopen:null,
  onmessage:null,
  onerror:null,
  onclose:null,
  send(data){
    if(!this.hasOpen){
      wx.showToast({
        title: '未连接websocket',
        icon:'none'
      })
      return;
    }
    if(typeof data !== "string")
      data = JSON.stringify(data)
    wx.sendSocketMessage({ data })
  },
  close(){
    wx.closeSocket()
  }
}