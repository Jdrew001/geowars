// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { autoUpdater } = require('electron-updater');

require("@electron/remote/main").initialize();
require('update-electron-app')({
  repo: 'https://github.com/Jdrew001/geowars',
  updateInterval: '5 minutes'
});

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

const isDevelopment = process.env.NODE_ENV !== 'production';



const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    backgroundColor: 'black',
    resizable: false,
    minimizable: false,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.setMenuBarVisibility(false);

  // and load the index.html of the app.
  //mainWindow.loadFile(__dirname, "./app/index.html")
  if (!isDevelopment) mainWindow.loadURL('file://' + path.join(__dirname, '..') + '/electron/app/index.html');
  else mainWindow.loadURL('http://localhost:8000');

  // Open the DevTools.
  //if (isDevelopment) mainWindow.webContents.openDevTools()

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});