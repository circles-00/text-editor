import Editor, { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { FC, useState } from 'react'

import type MonacoNamespace from 'monaco-editor'
import { loadMonacoWorker } from '../../utils'

type TMonaco = typeof MonacoNamespace

interface ITextEditorProps {}

const loadMonacoEditor = async () => {
  loader.config({ monaco })
  const monacoInstance = await loader.init()
  monacoInstance.languages.typescript.javascriptDefaults.setEagerModelSync(true)

  loadMonacoWorker()
}

export const TextEditor: FC<ITextEditorProps> = () => {
  loadMonacoEditor()

  const [value, setValue] = useState('')

  return (
    <Editor
      className="pt-2"
      height="100vh"
      width="90%"
      language="javascript"
      value={value}
    />
  )
}
