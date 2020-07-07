const { app, BrowserWindow, Menu } = require('electron')

function createWindow() {
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false
    },
    show: false
  })
  win.maximize();
  win.show();
  Menu.setApplicationMenu(null)

  // 加载index.html文件
  win.loadURL('https://www.baidu.com/')
  // win.loadURL('http://localhost:8888')
}

app.whenReady().then(createWindow)