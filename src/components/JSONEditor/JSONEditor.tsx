import React, { useMemo, useRef } from 'react'
import {
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  dropCursor,
  rectangularSelection,
  highlightActiveLine,
  keymap,
  EditorView,
} from '@codemirror/view'
import {
  foldGutter,
  indentOnInput,
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  foldKeymap,
} from '@codemirror/language'
import { history, defaultKeymap, historyKeymap, indentWithTab } from '@codemirror/commands'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete'
import { lintKeymap } from '@codemirror/lint'
import { Compartment, EditorState, Extension } from '@codemirror/state'
import { useHighlightStyle } from './useHighlightStyle'
import { CodeMirror, CodeMirrorComponentProps } from '@ui-schema/kit-codemirror/CodeMirror'
import { useExtension } from '@ui-schema/kit-codemirror/useExtension'
import { json } from '@codemirror/lang-json'

import { Container } from './JSONEditor.styles'
import { iconPlugin } from './iconPlugin'

interface StyledContainerProps {
  width?: string
  height?: string
  maxHeight?: string
  value?: string
}

interface PluginProps {
  widgetOnClick?: (propertyName: string) => void
  widgetPropNameList?: string[]
}

export const JSONEditor: React.FC<Omit<CodeMirrorComponentProps, 'value'> & StyledContainerProps & PluginProps> = ({
  // Styled container props
  width,
  height,
  maxHeight,
  // Plugin props
  widgetOnClick,
  widgetPropNameList,
  // values we want to override in this component
  value,
  effects,
  // everything else is just passed down
  ...props
}) => {
  const { onChange } = props
  const highlightStyle = useHighlightStyle()
  const { init: initHighlightExt, effects: effectsHighlightExt } = useExtension(
    () => syntaxHighlighting(highlightStyle || defaultHighlightStyle, { fallback: true }),
    [highlightStyle],
  )

  const effectsRef = useRef<((editor: EditorView) => void)[]>(effects || [])

  const viewerExtensions = [json(), iconPlugin(widgetOnClick, widgetPropNameList)]

  const editorExtensions = [json()]

  const extensions =
    typeof onChange === 'undefined' && widgetOnClick && widgetPropNameList?.length ? viewerExtensions : editorExtensions

  const extensionsAll: Extension[] = useMemo(
    () => [
      lineNumbers(),
      EditorView.lineWrapping,
      EditorView.contentAttributes.of({ tabindex: '0' }),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      new Compartment().of(EditorState.tabSize.of(4)),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...lintKeymap,
        indentWithTab,
      ]),
      initHighlightExt(),
      ...(extensions || []),
    ],
    [initHighlightExt],
  )

  // attach parent plugin effects first
  useMemo(() => {
    if (!effects) return effectsRef.current
    effectsRef.current.push(...effects)
  }, [effects])

  // attach each plugin effect separately (thus only the one which changes get reconfigured)
  useMemo(() => {
    if (!effectsHighlightExt) return
    effectsRef.current.push(...effectsHighlightExt)
  }, [effectsHighlightExt])

  return (
    <Container $width={width} $height={height} $maxHeight={maxHeight} $isEditMode={typeof onChange !== 'undefined'}>
      <CodeMirror
        value={value}
        extensions={extensionsAll}
        effects={effectsRef.current.splice(0, effectsRef.current.length)}
        {...props}
      />
    </Container>
  )
}
