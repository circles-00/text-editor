import { readdir } from 'fs/promises'
import { join } from 'path'

const sortObjectByKeys = (obj: Record<string, any>) => {
  return Object.keys(obj)
    .sort()
    .filter((key) => key !== '.git')
    .reduce((result, key) => {
      result[key] = obj[key]
      return result
    }, {})
}

export const getSingleFile = async (filePath: string) => {
  return {
    name: filePath.split('/').pop(),
    path: filePath,
  }
}

export const getAllFilesRecursively = async (dir: string) => {
  const files = await readdir(dir, { withFileTypes: true })
  const fileGroups = { files: [], directories: {} }

  await Promise.all(
    files.map(async (file) => {
      const filePath = join(dir, file.name)

      if (file.isDirectory()) {
        fileGroups.directories[file.name] = await getAllFilesRecursively(
          filePath
        )
      } else {
        fileGroups.files.push({
          name: file.name,
          path: filePath,
        })
      }
    })
  )

  fileGroups.files.sort((a, b) => a.name.localeCompare(b.name))
  fileGroups.directories = sortObjectByKeys(fileGroups.directories)

  return fileGroups
}
