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
  directory: IFileStructure
  singleFile: IFile | null
  setDirectory: (files: IFileStructure) => void
  setSingleFile: (file: IFile) => void
  currentFile: string | null
  setCurrentFile: (file: string | null) => void
}

export const useFileSystemStore = create<IFileSystemStore>((set) => ({
  directory: { directories: [], files: [] },
  singleFile: null,
  setDirectory: (files: IFileStructure) => set({ directory: files }),
  setSingleFile: (file: IFile) => set({ singleFile: file }),
  currentFile: null,
  setCurrentFile: (file: string | null) => set({ currentFile: file }),
}))
