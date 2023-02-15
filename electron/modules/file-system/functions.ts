import { BrowserWindow, dialog } from 'electron'

export const handleFileOpen = async (mainWindow: BrowserWindow) => {
  const {
    canceled,
    filePaths: [filePath],
  } = await dialog.showOpenDialog(mainWindow)

  if (canceled) {
    return
  }

  return filePath
}
