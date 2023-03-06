import { FC, RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { Terminal as XtermTerminal } from 'xterm'
import 'xterm/css/xterm.css'
import { useEffectOnce } from '../../hooks/use-effect-once'
import io from 'socket.io-client'
import { Resizable } from 'react-resizable-element'
import { useRegisterShortcut, ShortcutType } from 'react-keybinds'

interface ITerminalProps {}

const socket = io('http://localhost:3000')

export const Terminal: FC<ITerminalProps> = () => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminal, setTerminal] = useState<XtermTerminal | null>(null)
  const [show, setShow] = useState(true)

  const createTerminal = (terminalRef: RefObject<HTMLDivElement>) => {
    if (terminalRef.current === null) return

    const terminal = new XtermTerminal()
    terminal.open(terminalRef.current)
    setTerminal(terminal)
  }

  const disposeTerminal = () => {
    terminal?.dispose()
    setTerminal(null)
  }

  useEffectOnce(() => {
    if (terminalRef.current) {
      createTerminal(terminalRef)
    }

    return () => {
      disposeTerminal()
    }
  })

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('data', (data) => {
      if (terminal) {
        terminal.write(data)
      }
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
    })

    if (terminal) {
      terminal.onData((data) => {
        socket.emit('data', data)
      })
    }
  }, [terminal])

  const shortcut: ShortcutType = useMemo(
    () => ({
      keys: {
        Windows: ['Control', 'J'],
        Linux: ['Control', 'J'],
      },
      label: 'Inspired command',
      callback: () => {
        setShow(!show)
      },
    }),
    [show]
  )

  useRegisterShortcut(shortcut)

  return (
    <Resizable
      className={`bg-slate-700 w-[100%] h-[100%] ${show ? 'block' : 'hidden'}`}
      direction="top"
    >
      <div ref={terminalRef}></div>
    </Resizable>
  )
}
