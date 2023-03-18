const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: 'preload.js'
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);