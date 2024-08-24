import { SHORTCUTS, shortcutDescriptions, parseToKeyboardKeyDisplay } from '@/methods/shortcuts'
import { FC } from 'react'
import {
  ShortcutsInfoContainer,
  ShortcutContainer,
  ShortcutName,
  ShortcutCombination,
  ShortcutPlus,
  ShortcutKey,
} from './GetStarted.styles'
import { styled } from 'styled-components'

const Container = styled.div`
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`

export const Empty: FC = () => {
  return (
    <Container>
      <ShortcutsInfoContainer>
        {SHORTCUTS.split(',').map((shortcut, rowIndex) => {
          console.log(shortcut)
          const description = shortcutDescriptions[shortcut]
          const keys = shortcut.split(/(\+)/g)

          return (
            <ShortcutContainer key={rowIndex}>
              <ShortcutName>{description}</ShortcutName>
              <ShortcutCombination>
                {keys.map((key, subIndex) => {
                  if (key === '+') {
                    return <ShortcutPlus key={rowIndex + key + subIndex}>+</ShortcutPlus>
                  } else {
                    const keyName = parseToKeyboardKeyDisplay(key[0].toUpperCase() + key.slice(1))
                    return <ShortcutKey key={rowIndex + key + subIndex}>{keyName}</ShortcutKey>
                  }
                })}
              </ShortcutCombination>
            </ShortcutContainer>
          )
        })}
      </ShortcutsInfoContainer>
    </Container>
  )
}
