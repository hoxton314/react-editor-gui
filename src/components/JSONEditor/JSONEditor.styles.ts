import styled from 'styled-components'
import { Animatable } from '@styles/generic.styles'

const jsonDimensions = {
  lineHeight: '22px',
  linePadding: '0px 3px 0px 4px',
  spacing: '4px',
  contentPadding: `calc(4px / 2)`,
  borderRadius: '0px',
}

export const Container = styled.div<{
  $width?: string
  $height?: string
  $maxHeight?: string
  $isEditMode?: boolean
}>`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '100%'};
  max-height: ${({ $maxHeight }) => $maxHeight || '100%'};
  overflow-y: auto;
  border-radius: ${jsonDimensions.borderRadius};

  position: relative;

  color: ${({ theme }) => theme.colors['editor.foreground']};
  background-color: ${({ theme }) => theme.colors['editor.background']};

  border: ${({ theme, $isEditMode }) => ($isEditMode ? `1px solid ${theme.colors['tab.activeBorderTop']}` : 'none')};

  .cm-editor {
    outline: transparent;
    border-radius: ${jsonDimensions.borderRadius};
  }

  .cm-editor:hover {
    outline: transparent;
  }

  // invalid is a custom class used by WidgetCode when not valid to schema
  .cm-editor.invalid {
    outline: '2px solid ' + ${({ theme }) => theme.colors['editorError.foreground']};
  }
  .cm-editor.cm-focused {
    outline: '2px solid ' + ${({ theme }) => theme.colors['editor.selectionBackground']};
  }
  // invalid is a custom class used by WidgetCode when not valid to schema
  .cm-editor.cm-focused.invalid {
    outline: '2px solid ' + ${({ theme }) => theme.colors['editorError.foreground']};
  }

  .cm-content {
    caret-color: ${({ theme }) => theme.colors['editor.foreground']};
    padding: calc(4px / 2);
    line-height: ${jsonDimensions.lineHeight};
  }

  .cm-scroller {
    line-height: ${jsonDimensions.lineHeight};
  }
  .cm-focused .cm-cursor {
    border-left-color: ${({ theme }) => theme.colors['editor.foreground']};
  }
  .cm-editor .cm-line {
    padding: ${jsonDimensions.linePadding};
  }
  .cm-editor.cm-focused .cm-activeLine {
    background-color: ${({ theme }) => theme.colors['editor.selectionBackground']};
  }
  .cm-editor .cm-activeLine {
    background-color: transparent;
  }
  .cm-editor .cm-selectionMatch {
    background-color: ${({ theme }) => theme.colors['editor.selectionHighlightBackground']};
  }
  .cm-editor.cm-focused .cm-gutterElement.cm-activeLineGutter {
    background-color: ${({ theme }) => theme.colors['editor.selectionBackground']};
  }
  .cm-gutterElement.cm-activeLineGutter {
    background-color: transparent;
  }

  .cm-selectionBackground {
    background-color: ${({ theme }) => theme.colors['editor.selectionBackground']};
  }

  .cm-gutters {
    background-color: ${({ theme }) => theme.colors['editor.background']};
    color: ${({ theme }) => theme.colors['editor.foreground'] + '50'};
    border: none;
    border-top-left-radius: ${jsonDimensions.borderRadius};
    border-bottom-left-radius: ${jsonDimensions.borderRadius};
    user-select: none;
    ${Animatable}
  }

  .cm-gutters .cm-lineNumbers .cm-gutterElement {
    padding-left: ${jsonDimensions.spacing};
  }

  .cm-lineNumbers {
    ${Animatable}
  }

  .cm-gutterElement > span {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 5px;

    &::before {
      /* caret */
    }
  }

  .cm-editor .cm-foldPlaceholder {
    padding: '0 ' + ${jsonDimensions.spacing};
    background-color: ${({ theme }) => theme.colors['editor.background']};
    border-color: ${({ theme }) => theme.colors['editor.foreground']};
    color: ${({ theme }) => theme.colors['editor.foreground']};
  }

  ${Animatable}
`
