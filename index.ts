import * as fs from "fs";
const electron = require('electron');
const path = require('path');
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require("electron-devtools-installer")
const { app, BrowserWindow, ipcMain, dialog } = electron;
const isDev = process.env.NODE_ENV === 'development';

const generateUniqueFileName = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${timestamp}${random}.json`;
};

ipcMain.handle("create-file", async (_, { data }) => {
  try {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Save File",
      defaultPath: path.join(app.getPath('downloads'), generateUniqueFileName())
    });
    console.log("CANCELLED FILEPATH", { canceled, filePath });
    if (canceled || !filePath) return null;
    const name = generateUniqueFileName();
    if (!fs.existsSync(name)) await fs.promises.writeFile(filePath, data);
  } catch (e) {
    console.warn("Issues encountered while creating the file: \n", e);
  }
})

ipcMain.handle('append-file', async (_, { name, data }) => {
  try {
    if (!fs.existsSync(name)) await fs.promises.appendFile(name, data);
    else console.info("The file in question does not exist. Please create it first.");
    return null;
  } catch (e) {
    console.warn("Issues encountered while appending to the file: \n", e);
  }
});

ipcMain.handle('remove-file', async (_, { path: filePath }) => {
  try {
    if (fs.existsSync(filePath)) await fs.promises.unlink(filePath);
    else console.info("The file does not exist, so no action was taken.");
    return null;
  } catch (e) {
    console.warn("Issues encountered while removing the file: \n", e);
  }
});

ipcMain.handle('fetch-file', async (_, { path: filePath }) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      return data;
    }
    else console.info("The file does not exist and cannot be returned.");
    return null;
  } catch (e) {
    console.warn("Issues encountered while fetching the file: \n", e);
    return null;
  }
});

function createWindow() {
  const isDev = process.env.NODE_ENV === "development"
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  const window = new BrowserWindow({
    width,
    height,
    title: "Graph Plotter",
    // titleBarStyle: "hidden",
    // frame: false,
    webPreferences: {
      preload: isDev ? path.join(__dirname, 'preload.js') : path.join(app.getAppPath(), 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true,
      webSecurity: false
    },
    icon: `${__dirname}/icon.png`
  });
  window.setTitle("Graph Plotter");
  window.setIcon(`${__dirname}/icon.png`)
  window.webContents.setAudioMuted(false);
  window.webContents.session.setPermissionRequestHandler((webContents: Electron.WebContents, permission: string, callback: (allowed: boolean) => void) => {
    if (permission === 'media') callback(true); // Grant audio/video access
    else callback(false);
  })
  if (isDev) window.loadURL('http://localhost:3000');
  else window.loadFile(path.join(__dirname, 'build', 'index.html'), { hash: '' });
  window.on("maximize", () => { window.webContents.send("window-maximized"); });
  window.on("unmaximize", () => { window.webContents.send("window-unmaximized"); });
}

app.whenReady().then(() => {
  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((ext: any) => console.log(`Added Extension: ${ext.name}`))
      .catch((err: Error) => console.log('An error occurred: ', err));
    installExtension(REDUX_DEVTOOLS)
      .then((ext: any) => console.log(`Added Extension: ${ext.name}`))
      .catch((err: Error) => console.log('An error occurred: ', err));
  }
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });