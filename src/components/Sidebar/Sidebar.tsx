import { FC, useMemo, useState } from 'react'
import { DocumentIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { FileExplorer } from './components/FileExplorer'
import { TreeContextMenuProvider } from './components/TreeExplorer/context'
import { TreeContextMenu } from './components/TreeExplorer/components'
import { Tree } from './components/TreeExplorer/Tree'

interface IIconProps {
  isActive?: boolean
}

interface ISidebarProps {}

const sidebarItems = [
  {
    name: 'explorer',
    icon: ({ isActive }: IIconProps) => (
      <DocumentIcon
        className={`w-8 h-10 cursor-pointer ${
          isActive ? 'text-white' : 'text-slate-400'
        }`}
      />
    ),
  },
  {
    name: 'search',
    icon: ({ isActive }: IIconProps) => (
      <MagnifyingGlassIcon
        className={`w-8 mt-5 h-10 cursor-pointer ${
          isActive ? 'text-white' : 'text-slate-400'
        }`}
      />
    ),
  },
]

export const Sidebar: FC<ISidebarProps> = () => {
  const [currentItem, setCurrentItem] = useState(-1)

  const isCurrentItem = useMemo(
    () => (index: number) => index === currentItem,
    [currentItem]
  )

  const handleItemClick = (index: number) => {
    setCurrentItem(index)
  }

  const root = {
    title: 'root',
    children: [
      {
        title: 'Child1',
        children: [
          {
            title: 'Child2',
            children: [
              {
                title: 'Child2-1',
              },
              {
                title: 'Child2-2',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  }

  return (
    <div className="flex flex-row">
      <div className="resize relative p-2 flex flex-col items-center justify-start h-screen w-[60px] bg-slate-800 border-r-2 border-slate-500">
        {sidebarItems.map((item, index) => {
          return (
            <div key={index} onClick={() => handleItemClick(index)}>
              <item.icon isActive={isCurrentItem(index)} />
            </div>
          )
        })}
      </div>
      {/* <FileExplorer /> */}
      <TreeContextMenuProvider>
        <TreeContextMenu />
        <Tree root={root} />
      </TreeContextMenuProvider>
    </div>
  )
}
