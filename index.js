const { app, BrowserWindow } = require('electron');

app.whenReady().then(function () {

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false
  });

  win.loadFile('./views/index.html');

});
