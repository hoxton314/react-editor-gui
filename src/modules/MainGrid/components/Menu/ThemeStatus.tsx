import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { ThemeIcon } from './MenuIcons'
import { styled } from 'styled-components'
import { StoreContext } from '@/components/App'

const Container = styled.div`
  position: relative;
`

const ThemeIndex = styled.div<{ $count?: number }>`
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors['foreground']};
  color: ${({ theme }) => theme.colors['menu.background']};
  border-radius: 50%;

  font-size: 16px;
  font-weight: 700;

  ${({ $count }) =>
    $count > 9 &&
    `
    width: 28px;
    justify-content: flex-end;
    padding-right: 5px;
    border-radius: 8px;
  `}

  transition: width 0.2s, height 0.2s, border-radius 0.2s, padding-right 0.2s;
`

export const ThemeStatus: FC = observer(() => {
  const store = useContext(StoreContext)
  const { currentThemeIndex, selectedThemeNames } = store.ThemeState

  return (
    <Container>
      <ThemeIcon />
      {selectedThemeNames?.length > 2 && <ThemeIndex $count={currentThemeIndex}>{currentThemeIndex}</ThemeIndex>}
    </Container>
  )
})
