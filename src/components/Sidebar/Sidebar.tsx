import { FC, useEffect, useMemo, useState } from 'react'
import { DocumentIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useFileSystemStore } from '../../domains/file-system'

interface IIconProps {
  isActive?: boolean
}

interface ISidebarProps {}

const sidebarItems = [
  {
    name: 'explorer',
    icon: ({ isActive }: IIconProps) => (
      <DocumentIcon
        className={`w-10 h-10 cursor-pointer ${
          isActive ? 'text-white' : 'text-slate-400'
        }`}
      />
    ),
  },
  {
    name: 'search',
    icon: ({ isActive }: IIconProps) => (
      <MagnifyingGlassIcon
        className={`w-10 mt-10 h-10 cursor-pointer ${
          isActive ? 'text-white' : 'text-slate-400'
        }`}
      />
    ),
  },
]

export const Sidebar: FC<ISidebarProps> = () => {
  const [currentItem, setCurrentItem] = useState(-1)
  const { files, singleFile } = useFileSystemStore((state) => state)

  console.log('files', files)
  console.log('singleFile', singleFile)

  const isCurrentItem = useMemo(
    () => (index: number) => index === currentItem,
    [currentItem]
  )

  return (
    // Make absolute left sidebar with icons
    <div className="resize relative pt-5 flex flex-col items-center justify-start h-screen w-[80px] bg-slate-800 border-r-2 border-slate-500">
      {sidebarItems.map((item, index) => {
        return <item.icon key={index} isActive={isCurrentItem(index)} />
      })}
    </div>
  )
}
