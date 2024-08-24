import { css, styled } from 'styled-components'
import { Animatable } from '@styles/generic.styles'

interface TabManagerContainerProps {
  $isSplit?: boolean
  $leftWidth?: string
  $rightWidth?: string
}

const tabManagerContainerComputedStyles = ({ $isSplit, $leftWidth, $rightWidth }: TabManagerContainerProps) => {
  return { gridTemplateColumns: $isSplit ? `${$leftWidth} ${$rightWidth}` : '100%' }
}

export const TabManagerContainer = styled.div.attrs<TabManagerContainerProps>((props) => ({
  style: tabManagerContainerComputedStyles(props),
}))<TabManagerContainerProps>`
  grid-row: 1;
  grid-column: 1 / 3;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors['tab.border']};
  display: grid;
  grid-template-rows: 100%;
  background-color: ${({ theme }) => theme.colors['editorGroupHeader.tabsBackground']};
  position: relative;
  ${Animatable}
`

interface TabManagerColumnProps {
  $isOnlyChild?: boolean
  $isBeingDraggedOver?: boolean
  $isEmpty?: boolean
}

export const TabManagerColumn = styled.div<TabManagerColumnProps>`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  border-right-color: ${({ theme }) => theme.colors['tab.border']};
  border-right-style: solid;
  border-right-width: 1px;

  &:last-child {
    border-right: none;
  }

  ${({ $isOnlyChild }) =>
    $isOnlyChild &&
    css`
      grid-column: 1 / 3;
    `}

  ${({ $isBeingDraggedOver, $isEmpty }) =>
    $isBeingDraggedOver &&
    !$isEmpty &&
    css`
      ${TabWrap}:last-child {
        border-right: 1px solid ${({ theme }) => theme.colors['tab.activeBorderTop']};
      }
    `}

  background-color: ${({ theme, $isBeingDraggedOver, $isEmpty }) =>
    $isBeingDraggedOver && $isEmpty ? theme.colors['editorGroupHeader.tabsBackground'] : 'transparent'};
  filter: ${({ $isBeingDraggedOver, $isEmpty }) =>
    $isBeingDraggedOver && $isEmpty ? 'brightness(1.2)' : 'brightness(1)'};

  ${Animatable}
`

export const TabsContainer = styled.div<{ $isMain?: boolean }>`
  overflow: hidden;
  display: flex;
  height: 100%;
  width: 100%;
  border-right: ${({ $isMain, theme }) => ($isMain ? `1px solid ${theme.colors['activityBar.border']}` : 'none')};
`

interface TabWrapProps {
  $isActive?: boolean
  $isFocused?: boolean
  $isBeingDragged?: boolean
  $isSomethingDraggedOver?: boolean

  left?: string
  top?: string
}

interface TabCloseButtonProps {
  $isActive?: boolean
}

export const TabCloseButton = styled.button<TabCloseButtonProps>`
  padding: 5px;
  opacity: ${({ $isActive }) => ($isActive ? '100' : '0')};
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  color: inherit;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors['tab.inactiveForeground']};
    color: ${({ theme }) => theme.colors['tab.inactiveBackground']};
  }

  ${Animatable}
`

export const TabWrap = styled.div<TabWrapProps>`
  cursor: ${({ $isSomethingDraggedOver }) => ($isSomethingDraggedOver ? 'grabbing' : 'pointer')};
  height: 100%;
  max-height: 50px;
  min-width: 80px;
  padding: 0 10px 0 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  border-top: ${({ $isFocused, theme }) =>
    $isFocused ? `1px solid ${theme.colors['tab.activeBorderTop']}` : '1px solid transparent'};
  overflow: hidden;

  &:hover {
    ${TabCloseButton} {
      opacity: 100;
    }
  }

  border-right: ${({ theme }) => `1px solid ${theme.colors['tab.border']}`};
  border-left: ${({ theme, $isSomethingDraggedOver }) =>
    $isSomethingDraggedOver ? `1px solid ${theme.colors['tab.activeBorderTop']}` : `none`};

  &:last-child {
    border-right: none;
  }

  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors['tab.activeBackground'] : theme.colors['tab.inactiveBackground']};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors['tab.activeForeground'] : theme.colors['tab.inactiveForeground']};

  ${({ $isActive }) =>
    !$isActive &&
    css`
      &:hover {
        background-color: ${({ theme }) => theme.colors['tab.hoverBackground']};
      }
    `}

  ${Animatable}
`

export const TabIconWrap = styled.div`
  width: 20px;
  height: 20px;
`

export const TabTitle = styled.div`
  margin-bottom: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
