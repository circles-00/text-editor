import { BrowserWindow, ipcMain } from 'electron'
import { handleFileOpen, readFileFromPath } from './functions'

export const loadFileSystemFunctions = async (window: BrowserWindow) => {
  ipcMain.handle('dialog:openFile', () => handleFileOpen(window))
  ipcMain.handle('fs:readFile', (_, path: string) =>
    readFileFromPath(window, path)
  )
}
