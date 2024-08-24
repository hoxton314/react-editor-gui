import { TabCloseButton, TabWrap } from '@/modules/TabbedCodeView/TabManager/TabManager.styles'
import { ContextMenuStyle } from '@/store/UserInterface.store'
import { css, styled } from 'styled-components'

interface ContextMenuContainerProps {
  $style?: ContextMenuStyle
  $parentBoundingRect?: DOMRect
  $isVisible?: boolean
  $posX?: number
  $posY?: number
}

export const ContextMenuContainer = styled.div<ContextMenuContainerProps>`
  position: absolute;
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  background-color: ${({ theme }) => theme.colors['menu.background']};
  border: 1px solid ${({ theme }) => theme.colors['menu.border']};
  border-radius: 6px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.36);
  overflow: hidden;

  max-height: ${({ $posY }) => `calc(100vh - ${$posY}px - 40px)`};
  overflow-y: auto;

  ${({ $style, $posX, $posY }) =>
    ($style === 'default' || !$style) &&
    css`
      top: ${`${$posY}px`};
      left: ${`${$posX}px`};
    `}

  ${({ $style, $parentBoundingRect }) =>
    $style === 'dropdown' &&
    css`
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      top: ${`${$parentBoundingRect.bottom}px`};
      right: ${`${window.innerWidth - $parentBoundingRect.right}px`};
    `}
`

export const MenuItem = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors['menu.background']};
  color: ${({ theme }) => theme.colors['menu.foreground']};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  text-align: left;

  padding: 0 20px;
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors['menu.selectionForeground']};
    filter: brightness(1.1);
  }

  &:disabled {
    color: ${({ theme }) => `${theme.colors['menu.foreground']}55`};
    cursor: default;

    &:hover {
      filter: brightness(1);
    }
  }
`

export const MenuItemSeparator = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors['menu.border']};
`

export const DropdownTabItem = styled(TabWrap)`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 40px;

  border-top: none;
  border-right: none;

  position: relative;

  ${TabCloseButton} {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`
