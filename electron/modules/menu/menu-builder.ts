import { BrowserWindow, Menu } from 'electron'
import { getMainMenuTemplate } from './menu-templates'

export const buildMenu = (window: BrowserWindow) => {
  const menu = Menu.buildFromTemplate(getMainMenuTemplate(window))
  Menu.setApplicationMenu(menu)
}
