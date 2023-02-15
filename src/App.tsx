import { TextEditor } from './components'
import { Sidebar } from './components/Sidebar'
import { useLoadIpcListeners } from './ipc'

function App() {
  useLoadIpcListeners()

  return (
    <div className="w-screen flex flex-row">
      <Sidebar />
      <TextEditor />
    </div>
  )
}

export default App
