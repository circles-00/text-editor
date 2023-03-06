import { Transition } from '@headlessui/react'
import React, { useCallback, useState } from 'react'
import { File } from '../types/File'
import { DirectoryIcon } from '../icons'
import { Item } from './Item'
import { Tree } from '../Tree'

export const Directory = ({
  item,
  onContextMenu,
  setShow,
}: React.PropsWithChildren<{
  item: File
  onContextMenu: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
  setShow: (s: boolean) => void
}>): JSX.Element => {
  const [toggle, setToggle] = useState<boolean>(false)
  const onItemClicked = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      event.stopPropagation()
      setToggle(!toggle)
      setShow(false)
    },
    []
  )
  return (
    <Item onClick={onItemClicked} onContextMenu={onContextMenu}>
      <span className=" hover:bg-gray-100 transition block pl-0 p-2 truncate">
        <DirectoryIcon />
        {item.title}
      </span>
      <Transition
        show={toggle}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Tree root={item} />
      </Transition>
    </Item>
  )
}
