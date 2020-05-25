const path = require('path')
const url = require('url')
// Modules to control application life and create native browser window
const {
  app,
  Tray,
  Menu,
  ipcMain,
  BrowserWindow
} = require('electron')

let mainWindow = null;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow.destroy();
    app.quit()
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  const tray = new Tray('./resources/tray/16x16.png')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开app',
      click: () => {
        createWindow()
      }
    },
    {
      label: '退出',
      click: () => {
        mainWindow.close()
      }
    }
  ])

  tray.setContextMenu(contextMenu)

  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.allowRendererProcessReuse = false

ipcMain.on('open-url', (_event, page) => {
  console.log(page);
  
  const link = url.format({
    protocol: 'file:',
    pathname: path.resolve(app.getAppPath(), '.', page),
    slashes: true
  });
  mainWindow.loadURL(link)
});


function getWin() {
  return mainWindow
}

module.exports = {
  getWin
}