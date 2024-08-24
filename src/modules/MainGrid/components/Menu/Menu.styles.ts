import { css, styled } from 'styled-components'
import { Animatable } from '@styles/generic.styles'

export const MenuWrapper = styled.section`
  grid-area: menu;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  border-right: 1px solid ${({ theme }) => theme.colors['activityBar.border']};
  background-color: ${({ theme }) => theme.colors['sideBar.background']};
  color: ${({ theme }) => theme.colors['sideBar.foreground']};

  display: flex;
  flex-direction: column;

  ${Animatable}
`

export const MenuMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: center;
`

export const MenuNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

export const MenuFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

interface MenuItemProps {
  $active?: boolean
}

export const MenuItem = styled.button.attrs<MenuItemProps>((props) => {
  const { $active, theme } = props

  return {
    style: {
      color: $active ? theme.colors['badge.background'] : theme.colors['activityBar.inactiveForeground'],
      backgroundColor: $active ? `${theme.colors['badge.background']}30` : theme.colors['sideBar.background'],
    },
  }
})<MenuItemProps>`
  outline: none;
  border: none;
  background: none;

  width: 100%;
  aspect-ratio: 1;

  display: flex;
  justify-content: center;
  align-items: center;

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
