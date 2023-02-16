import { FC, useEffect, useRef, useState } from 'react'
import { Terminal as XtermTerminal } from 'xterm'
import 'xterm/css/xterm.css'
import { useEffectOnce } from '../../hooks/use-effect-once'
import io from 'socket.io-client'

interface ITerminalProps {}

const socket = io('http://localhost:3000')

export const Terminal: FC<ITerminalProps> = () => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminal, setTerminal] = useState<XtermTerminal | null>(null)

  useEffectOnce(() => {
    if (terminalRef.current) {
      const terminal = new XtermTerminal()

      terminal.open(terminalRef.current)
      setTerminal(terminal)
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

  return (
    <div className="bg-slate-700 w-[100%] h-[100%]" ref={terminalRef}></div>
  )
}
