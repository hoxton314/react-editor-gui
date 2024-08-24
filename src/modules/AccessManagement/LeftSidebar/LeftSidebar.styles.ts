import { css, styled } from 'styled-components'
import { Animatable, AnimatableAll } from '@styles/generic.styles'
import { ContentLoader } from '@components/ContentLoader/ContentLoader'

export const LeftSidebarWrapper = styled.section`
  grid-area: leftsidebar;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors['sideBar.background']};
  color: ${({ theme }) => theme.colors['sideBar.foreground']};
  position: relative;

  display: grid;
  grid-template-rows: 50px 50px 100%;
  grid-template-columns: 142px 1fr;

  ${Animatable}
`

export const ContentLoaderSkeleton = styled(ContentLoader)`
  grid-row: 3;
  grid-column: 1 / 3;
  width: 100%;
  background-color: ${({ theme }) => theme.colors['sideBar.background']};
  padding: 24px;

  ${Animatable}
`

export const TypeSelection = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-row: 3;
  grid-column: 1;
`

export const AccessListTypeTab = styled.button<{ $active?: boolean }>`
  //css reset
  border: none;
  background: ${({ theme }) => theme.colors['sideBar.background']};
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors['sideBar.foreground']};

  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;

  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  height: 40px;

  ${({ $active }) =>
    $active &&
    css`
      background-color: ${({ theme }) => theme.colors['editor.background']};
    `}

  /* color: $active ? theme.colors['badge.background'] : theme.colors['activityBar.inactiveForeground'], */
${({ $active }) =>
    !$active &&
    css`
      &:hover {
        background-color: ${({ theme }) => `${theme.colors['activityBar.inactiveForeground']}35`} !important;
        cursor: pointer;
      }
    `} 
    
    ${Animatable}
`

export const TopContainer = styled.div<{ $gridRow: string }>`
  grid-row: ${({ $gridRow }) => $gridRow};
  grid-column: 1 / 3;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors['editor.background']};
  border-bottom: 1px solid ${({ theme }) => theme.colors['activityBar.border']};
  display: flex;
  justify-content: space-between;

  ${Animatable}
`

export const AccessList = styled.div<{ $colCount: number }>`
  grid-row: 3;
  grid-column: 2;
  list-style: none;
  margin: 0;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors['editor.background']};
  display: grid;
  grid-template-columns: ${({ $colCount }) => `repeat(${$colCount}, auto)`};
  grid-template-rows: repeat(auto-fill, 40px);

  ${Animatable}
`

const Item = styled.div`
  padding: 12px 12px 12px 24px;
  font-size: 18px;
  font-weight: 400;
  line-height: 15px;
  height: 40px;
  min-height: 40px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ theme }) => theme.colors['sideBar.foreground']};
  background-color: ${({ theme }) => theme.colors['editor.background']};
  ${Animatable}
`
interface StyledAccessListItemProps {
  $active?: boolean
  $width?: number
  $isHovering?: boolean
  $isCurrentlyViewing?: boolean
}

export const StyledAccessListItem = styled(Item)<StyledAccessListItemProps>`
  position: relative;
  ${({ $active }) =>
    $active &&
    css`
      filter: brightness(1.2);
    `}

  ${({ $active, $isCurrentlyViewing }) =>
    $active &&
    $isCurrentlyViewing &&
    css`
      color: ${({ theme }) => theme.colors['badge.background']};
    `}

  ${({ $active }) =>
    !$active &&
    css`
      &:hover {
        background-color: ${({ theme }) => `${theme.colors['activityBar.inactiveForeground']}35`};
        cursor: pointer;
      }
    `}

    ${({ $isHovering, $active }) =>
    !$active &&
    $isHovering &&
    css`
      background-color: ${({ theme }) => `${theme.colors['activityBar.inactiveForeground']}35`};
      cursor: pointer;
    `}
`

export const DeleteButton = styled.button<{ $visible: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  border-left: 1px solid ${({ theme }) => theme.colors['activityBar.border']};
  height: 40px;
  width: ${({ $visible }) => ($visible ? '40px' : '0')};
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors['statusBar.debuggingBackground']};
  color: ${({ theme }) => theme.colors['sideBar.foreground']};

  ${AnimatableAll}
`

export const StyledAccessListHeader = styled(Item)`
  filter: brightness(1.2);
`

export const ActionButton = styled.button`
  border: none;
  outline: none;
  height: 100%;
  background-color: ${({ theme }) => theme.colors['activityBar.background']};
  border-left: 1px solid ${({ theme }) => theme.colors['activityBar.border']};
  color: ${({ theme }) => theme.colors['sideBar.foreground']};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  white-space: nowrap;
  padding: 0 16px;
  font-size: 15px;
  font-weight: 600;

  &:hover {
    filter: brightness(1.5);
  }

  ${Animatable}
`

export const FilterContainer = styled.div`
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 400;
`
