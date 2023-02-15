import { BrowserWindow, MenuItem } from 'electron'
import { handleFileOpen } from '../../file-system'

export const getMainMenuTemplate = (window: BrowserWindow) =>
  [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            handleFileOpen(window)
          },
        },
        {
          label: 'Open Folder',
          accelerator: 'CmdOrCtrl+K CmdOrCtrl+O',
          click: () => {
            handleFileOpen(window, true)
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
      ],
    },
  ] as unknown as MenuItem[]
