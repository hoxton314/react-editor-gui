import { styled } from 'styled-components'
import { Animatable } from '@styles/generic.styles'

export const RightBarWrapper = styled.section`
  grid-area: rightsidebar;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors['sideBar.background']};
  color: ${({ theme }) => theme.colors['sideBar.foreground']};
  position: relative;
  padding: 10px;
  user-select: none;

  ${Animatable}
`

export const CategoryWrapper = styled.div`
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const CategoryTitle = styled.h2`
  width: 100%;
  color: ${({ theme }) => theme.colors['menu.selectionForeground']};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 39px;
`

export const Button = styled.button`
  outline: none;
  cursor: pointer;
  padding: 0 50px;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors['dropdown.foreground']};
  border: 1px solid ${({ theme }) => theme.colors['dropdown.foreground']};
  color: ${({ theme }) => theme.colors['dropdown.background']};

  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 39px;
`

export const ActionsList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-direction: column;
`
