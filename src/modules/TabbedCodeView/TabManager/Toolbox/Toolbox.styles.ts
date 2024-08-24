import { Animatable } from '@/styles/generic.styles'
import { styled } from 'styled-components'

interface ToolboxStylesProps {
  $isTransparent?: boolean
}

const toolboxStylesComputed = ({ $isTransparent }: ToolboxStylesProps) => {
  return {
    opacity: $isTransparent ? '0' : '100',
    pointerEvents: ($isTransparent ? 'none' : 'auto') as 'none' | 'auto',
  }
}

export const ToolboxContainer = styled.div.attrs<ToolboxStylesProps>((props) => ({
  style: toolboxStylesComputed(props),
}))<ToolboxStylesProps>`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  height: 50px;
`

export const ToolboxButton = styled.button`
  height: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors['menubar.selectionBackground']};
  color: ${({ theme }) => theme.colors['icon.foreground']};
  border: none;
  border-right: 1px solid ${({ theme }) => theme.colors['menu.separatorBackground']};
  outline: none;
  color: inherit;

  display: flex;
  align-items: center;
  justify-content: center;

  &:last-child {
    border-right: none;
  }

  &:hover {
    filter: brightness(1.5);
  }

  ${Animatable}
`

export const MinimizedToolboxContainer = styled.div<{ $isShowingTabDropdown?: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  width: ${({ $isShowingTabDropdown }) => ($isShowingTabDropdown ? '100px' : '50px')};
  height: 50px;
  display: flex;
`
