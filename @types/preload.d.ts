import { FilesHandler, IpcHandler } from '../preload'

declare global {
  interface Window {
    ipc: IpcHandler;
    files: FilesHandler;
  }
}



// You can add more formats as needed