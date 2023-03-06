import * as monaco from 'monaco-editor'
import { FC, useEffect, useRef, useState } from 'react'
import { useFileSystemStore } from '../../domains/file-system'
import { useEffectOnce } from '../../hooks/use-effect-once'

import { getLanguageOfFile, loadMonacoWorker } from '../../utils'

interface ITextEditorProps {}

export const TextEditor: FC<ITextEditorProps> = () => {
  const { currentFile } = useFileSystemStore((state) => state)

  const editorRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null)
  loadMonacoWorker()

  const language = getLanguageOfFile('test.tsx')

  const handleOnGoToDefinition = (editor: any) => {
    const editorService = editor._codeEditorService
    const openEditorBase = editorService.openCodeEditor.bind(editorService)
    if (openEditorBase) {
    }

    editorService.openCodeEditor = async (
      input: any,
      source: any,
      sideBySide: any
    ) => {
      const result = await openEditorBase(input, source)
      if (result === null) {
        const fullPath = input.resource.path
        const lineNumber = input.options.selection.startLineNumber

        alert('file is at ' + fullPath + ':' + lineNumber)
      }
      return result // always return the base result
    }
  }

  useEffectOnce(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value: currentFile ?? '',
        language: language,
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        // automaticLayout: true,
      })

      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2016,
        jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
        allowNonTsExtensions: true,
        allowJs: true,
      })

      handleOnGoToDefinition(editor)
      setEditor(editor)
    }
  })

  useEffect(() => {
    if (editor) {
      const currentFileContent = currentFile ?? ''
      const languageModel = monaco.editor.createModel(
        currentFileContent,
        'typescript'
      )
      editor.setValue(currentFileContent)
      editor.setModel(languageModel)
    }
  }, [currentFile, editor])

  return <div className="p-5 h-[100%] w-[100%]" ref={editorRef}></div>
}
