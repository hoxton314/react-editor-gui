import { styled } from 'styled-components'

interface EditorViewContainerProps {
  $menuWidth: string
  $isDragging?: boolean
}

const getEditorViewContainerDynamicStyles = (props: EditorViewContainerProps) => ({
  gridTemplateColumns: `${props.$menuWidth} 1fr`,
  gridTemplateRows: `1fr`,
  cursor: props.$isDragging ? 'col-resize' : 'default',
})

export const EditorViewContainer = styled.div.attrs<EditorViewContainerProps>((props) => ({
  style: getEditorViewContainerDynamicStyles(props),
}))`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-areas: 'menu main ';
  overflow: hidden;
`
