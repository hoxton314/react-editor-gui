import { Animatable } from '@/styles/generic.styles'
import { styled } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 33% 66%;
  grid-template-rows: auto auto auto;
  gap: 50px 0;
  padding: 80px 120px;

  @container (width < 800px) {
    padding: 60px 50px;

    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  @container (width < 600px) {
    padding: 40px 20px;
  }
`

export const LogoContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 1;

  display: flex;
  justify-content: center;
`

export const RecentWindowsContainer = styled.div`
  grid-column: 1;
  grid-row: 2;

  padding-right: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`

export const RecentTitle = styled.h2`
  color: ${({ theme }) => theme.colors['menu.selectionForeground']};
  font-size: 18px;
  font-weight: 600;
`
export const RecentlyClosedTabItem = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors['sideBar.foreground']};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const ShortcutsInfoContainer = styled.div`
  /* grid-column: 2; */
  grid-row: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;

  padding-left: 100px;
  /* border-left: 1px solid ${({ theme }) => theme.colors['dropdown.border']}; */

  @container (width < 800px) {
    border-left: none;
    padding-left: 0;
  }

  grid-column: 1 / 3;
`

export const ShortcutContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`

export const ShortcutName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['sideBar.foreground']};
`

export const ShortcutCombination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors['dropdown.border']};
`

export const ShortcutPlus = styled.div`
  width: 26px;
  text-align: center;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: inherit;
`

export const ShortcutKey = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors['dropdown.border']};
  height: 42px;
  min-width: 60px;
  padding: 0 10px;
`

export const IconGridContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 3;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
`

export const Icon = styled.div`
  width: 180px;
  height: 105px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  color: ${({ theme }) => theme.colors['sideBar.foreground']};
  border: 1px solid ${({ theme }) => theme.colors['dropdown.border']};
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors['dropdown.border']};
    color: ${({ theme }) => theme.colors['menu.selectionForeground']};
    cursor: pointer;
  }

  ${Animatable}
`
