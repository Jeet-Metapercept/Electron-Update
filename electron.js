const {app, BrowserWindow, ipcMain} = require('electron');
const {autoUpdater} = require("electron-updater");
let win; // this will store the window object

// creates the default window
function createDefaultWindow() {
    win = new BrowserWindow({width: 900, height: 680});
    win.loadURL(`file://${__dirname}/index.html`);
    win.on('closed', () => app.quit());
	//mainWindow.webContents.openDevTools();
  return win;
}

// when the app is loaded create a BrowserWindow and check for updates
app.on('ready', function() {
  createDefaultWindow()
  autoUpdater.checkForUpdates();
});

// when the update has been downloaded and is ready to be installed, notify the BrowserWindow
autoUpdater.on('update-downloaded', (info) => {
    win.webContents.send('updateReady')
});

//Checking for update
autoUpdater.on('checking-for-update', (info) => {
    win.webContents.send('updateAvailable')
});

/* autoUpdater.on('error', err => console.log(err));
autoUpdater.on('checking-for-update', () => console.log('checking-for-update'));
autoUpdater.on('update-available', () => console.log('update-available'));
autoUpdater.on('update-not-available', () => console.log('update-not-available'));
 */



// when receiving a quitAndInstall signal, quit and install the new version ;)
ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
})