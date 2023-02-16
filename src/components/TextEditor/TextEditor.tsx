import * as monaco from 'monaco-editor'
import { FC, useRef, useState } from 'react'
import { useEffectOnce } from '../../hooks/use-effect-once'

import { loadMonacoWorker } from '../../utils'

interface ITextEditorProps {}

export const TextEditor: FC<ITextEditorProps> = () => {
  const editorRef = useRef<HTMLDivElement>(null)
  loadMonacoWorker()
  const [value, setValue] = useState('')

  useEffectOnce(() => {
    if (editorRef.current) {
      monaco.editor.create(editorRef.current, {
        value:
          "// First line\nfunction hello() {\n\talert('Hello world!');\n}\n// Last line",
        language: 'typescript',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
      })

      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2016,
        jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
        allowNonTsExtensions: true,
        allowJs: true,
      })
    }
  })

  return <div className="p-5 h-[100%] w-[100%]" ref={editorRef}></div>
}
