import { css, styled } from 'styled-components'
import { Animatable } from '@styles/generic.styles'
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
  grid-template-rows: 50px 100%;
  grid-template-columns: 150px 1fr;

  ${Animatable}
`

export const ContentLoaderSkeleton = styled(ContentLoader)`
  grid-row: 2;
  grid-column: 1 / 3;
  width: 100%;
  background-color: ${({ theme }) => theme.colors['sideBar.background']};
  padding: 24px;

  ${Animatable}
`

export const ConfigurationTypeSelection = styled.nav<{ $isTabSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  width: 100%;
  grid-row: 2;
  ${({ $isTabSelected }) =>
    $isTabSelected
      ? css`
          grid-column: 1;
        `
      : css`
          grid-column: 1 / 3;
        `}
`

export const ConfigurationTypeTab = styled.button<{ $active?: boolean }>`
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

export const ConfigurationList = styled.ul<{ $headerHeight?: string }>`
  grid-row: 2;
  grid-column: 2;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors['editor.background']};
  padding: 12px 0;
  width: 100%;
  height: ${({ $headerHeight }) => `calc(100vh - ${$headerHeight})`};
  overflow-y: auto;
  border-left: 1px solid ${({ theme }) => theme.colors['activityBar.border']};

  ${Animatable}
`

interface ConfigurationListItemProps {
  $active?: boolean
  $width?: number
  $isCurrentlyViewing?: boolean
}

export const StyledConfigurationListItem = styled.li<ConfigurationListItemProps>`
  display: block;
  padding: 12px 24px;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  color: ${({ theme }) => theme.colors['sideBar.foreground']};
  background-color: ${({ theme }) => theme.colors['editor.background']};
  height: 40px;
  min-height: 40px;
  width: ${({ $width }) => ($width > 0 ? `calc(${$width}px)` : '100%')};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  ${({ $active }) =>
    $active &&
    css`
      filter: brightness(1.2);
    `}

  ${({ $active }) =>
    !$active &&
    css`
      &:hover {
        background-color: ${({ theme }) => `${theme.colors['activityBar.inactiveForeground']}35`};
        cursor: pointer;
      }
    `}

    ${({ $active, $isCurrentlyViewing }) =>
    $active &&
    $isCurrentlyViewing &&
    css`
      color: ${({ theme }) => theme.colors['badge.background']};
    `}

    ${Animatable}
`

export const TopContainer = styled.div`
  grid-row: 1;
  grid-column: 1 / 3;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors['editor.background']};
  border-bottom: 1px solid ${({ theme }) => theme.colors['activityBar.border']};
  display: flex;
  justify-content: space-between;

  ${Animatable}
`
