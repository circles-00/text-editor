import { create } from 'zustand'

export interface IFile {
  name: string
  path: string
}

interface IDirectory {
  [key: string]: IFileStructure
}

export interface IFileStructure {
  files: IFile[]
  directories: IDirectory[]
}

interface IFileSystemStore {
  files: IFileStructure[]
  singleFile: IFile | null
  setFiles: (files: IFileStructure[]) => void
  setSingleFile: (file: IFile) => void
}

export const useFileSystemStore = create<IFileSystemStore>((set) => ({
  files: [],
  singleFile: null,
  setFiles: (files: IFileStructure[]) => set({ files }),
  setSingleFile: (file: IFile) => set({ singleFile: file }),
}))
