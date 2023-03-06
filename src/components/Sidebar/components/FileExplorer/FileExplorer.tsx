import { FC } from 'react'
import { IFile, useFileSystemStore } from '../../../../domains/file-system'

interface IFileExplorerProps {}

export const FileExplorer: FC<IFileExplorerProps> = () => {
  const { directory, setCurrentFile } = useFileSystemStore((state) => state)

  const openCurrentFile = async (file: IFile) => {
    const fileContent = await window.electronFs.readFile(file.path)
    setCurrentFile(fileContent)
  }

  return (
    <div className="flex flex-col justify-start bg-slate-700 h-screen w-[300px]">
      <h1 className="text-white pt-4 pl-4 text-sm">File Explorer</h1>
      <div className="flex flex-col justify-start items-start p-4">
        <div className="flex flex-col">
          {Object.entries(directory.directories).map(
            ([directoryName, value], index) => (
              <p key={index} className="text-white p-1 text-sm">
                {directoryName}
              </p>
            )
          )}
          {directory.files.map((file, index) => (
            <p
              key={index}
              className="text-white p-1 text-sm cursor-pointer"
              onClick={() => openCurrentFile(file)}
            >
              {file.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
