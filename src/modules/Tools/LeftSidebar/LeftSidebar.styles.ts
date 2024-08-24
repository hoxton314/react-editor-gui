import { css, styled } from 'styled-components'
import { Animatable } from '@styles/generic.styles'

export const LeftSidebarWrapper = styled.section`
  grid-area: leftsidebar;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors['sideBar.background']};
  border-right: 1px solid ${({ theme }) => theme.colors['sideBar.border']};
  color: ${({ theme }) => theme.colors['sideBar.foreground']};
  position: relative;

  display: flex;
  flex-direction: column;
  padding: 40px 0;

  ${Animatable}
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
  padding: 16px 48px 16px 24px;
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
