import type { IpcRendererEvent } from 'electron';
const electron = require('electron');
const { BrowserWindow, contextBridge, ipcRenderer } = electron;

const ipcHandler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },
  sendMultiple: (channel: string, ...data: any[]) => {
    const validChannels: string[] = [];
    if (validChannels.includes(channel)) ipcRenderer.send(channel, ...data);
  },
  invoke: async (channel: string, data?: any) => {
    const validInvokeChannels: string[] = [];
    if (validInvokeChannels.includes(channel)) return await ipcRenderer.invoke(channel, data);
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
  off(channel: string, listener: (...args: unknown[]) => void) {
    ipcRenderer.removeListener(channel, listener);
  },
  removeAllListeners() {
    ipcRenderer.removeAllListeners()
  },
};

const fileHandler = {
  create: async (data: string) => await ipcRenderer.invoke("create-file", { data }),
  append: async (name: string, data: string) => await ipcRenderer.invoke("append-file", { name, data }),
  remove: async (path: string) => await ipcRenderer.invoke("remove-file", { path }),
  getFile: async (path: string) => await ipcRenderer.invoke("fetch-file", { path }),
  getPathForFile: (file: File) => electron.webUtils.getPathForFile(file)
}

contextBridge.exposeInMainWorld('ipc', ipcHandler);
contextBridge.exposeInMainWorld('files', fileHandler);

export type IpcHandler = typeof ipcHandler;
export type FilesHandler = typeof fileHandler;