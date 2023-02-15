import { BrowserWindow, ipcMain } from 'electron'
import { handleFileOpen } from './functions'

export const loadFileSystemFunctions = async (window: BrowserWindow) => {
  ipcMain.handle('dialog:openFile', () => handleFileOpen(window))
}
