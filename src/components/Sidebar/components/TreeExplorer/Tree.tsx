import React, { useCallback, useMemo } from 'react'
import { FileIcon } from './icons'
import { Item, Directory } from './components'
import { useContextMenu } from './context'
import { State, File } from './types'
import { Resizable } from 'react-resizable-element'

export const Tree = ({
  root,
}: React.PropsWithChildren<{ root: File }>): JSX.Element => {
  const { setShow, setPosition }: State = useContextMenu()
  const color_gen = useMemo(
    () => Math.floor(Math.random() * 16777215).toString(16),
    []
  )
  const onContextMenu = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
      event.stopPropagation()
      event.preventDefault()
      const { currentTarget } = event
      setShow && setShow(true)
      setPosition &&
        setPosition({
          x: currentTarget.offsetTop,
          y: currentTarget.offsetLeft + 40,
        })
    },
    [setShow, setPosition]
  )

  const onItemClicked = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      event.stopPropagation()
      setShow && setShow(false)
    },
    []
  )

  return (
    <Resizable
      minSize={200}
      direction="right"
      style={{ borderLeftColor: `#${color_gen}`, borderLeftWidth: 2 }}
      className="p-2 w-[200px] h-screen pt-0 mb-0 mt-0 pb-0 menu bg-default text-content-700 bg-slate-700 text-white"
    >
      <ul>
        {root.children &&
          root.children.map((item) => {
            if (item.children && item.children.length > 0)
              return (
                setShow && (
                  <Directory
                    key={item.title}
                    item={item}
                    setShow={setShow}
                    onContextMenu={onContextMenu}
                  />
                )
              )
            return (
              <Item
                key={item.title}
                onClick={onItemClicked}
                onContextMenu={onContextMenu}
              >
                <span className=" hover:bg-gray-100 transition block pl-0 p-2 truncate">
                  <FileIcon />
                  {item.title}
                </span>
              </Item>
            )
          })}
      </ul>
    </Resizable>
  )
}
