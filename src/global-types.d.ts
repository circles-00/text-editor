import { IFile, IFileStructure } from './domains/file-system'

declare global {
  interface Window {
    electronFs: {
      onOpenDirectory: (
        callback: (event: any, files: IFileStructure[]) => void
      ) => void
      onOpenFile: (callback: (event: any, files: IFile) => void) => void
    }
  }
}
