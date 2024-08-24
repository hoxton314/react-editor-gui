import { styled } from 'styled-components'

interface AccessManagementContainerProps {
  $menuWidth: string
  $isDragging?: boolean
  $leftSidebarWidth: string
  $rightSidebarWidth: string
}

const getAccessManagementDynamicStyles = (props: AccessManagementContainerProps) => ({
  gridTemplateColumns: `${props.$leftSidebarWidth} 1fr ${props.$rightSidebarWidth}`,
  cursor: props.$isDragging ? 'col-resize' : 'default',
})

export const AccessManagementWrapper = styled.div.attrs<AccessManagementContainerProps>((props) => ({
  style: getAccessManagementDynamicStyles(props),
}))`
  grid-area: main;
  background-color: ${({ theme }) => theme.colors['editor.background']};
  color: ${({ theme }) => theme.colors['editor.foreground']};

  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas: 'leftsidebar editor rightsidebar';
`
