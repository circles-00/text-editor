import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { KeyBindProvider } from 'react-keybinds'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <KeyBindProvider>
      <App />
    </KeyBindProvider>
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
