import { styled } from 'styled-components'
import { Animatable } from '@styles/generic.styles'

interface ConfigurationViewContainerProps {
  $menuWidth: string
  $isDragging?: boolean
  $leftSidebarWidth: string
  $rightSidebarWidth: string
}

const getConfigurationViewDynamicStyles = (props: ConfigurationViewContainerProps) => ({
  gridTemplateColumns: `${props.$leftSidebarWidth} 1fr ${props.$rightSidebarWidth}`,
  cursor: props.$isDragging ? 'col-resize' : 'default',
})

export const ConfigurationViewWrapper = styled.div.attrs<ConfigurationViewContainerProps>((props) => ({
  style: getConfigurationViewDynamicStyles(props),
}))`
  grid-area: main;
  background-color: ${({ theme }) => theme.colors['editor.background']};
  color: ${({ theme }) => theme.colors['editor.foreground']};

  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas: 'leftsidebar editor rightsidebar';

  ${Animatable}
`
