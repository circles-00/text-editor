import { TextEditor } from './components'
import { Sidebar } from './components/Sidebar'
import { Terminal } from './components/Terminal'
import { useLoadIpcListeners } from './ipc'

function App() {
  useLoadIpcListeners()

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-screen">
        <TextEditor />
        <Terminal />
      </div>
    </div>
  )
}

export default App
