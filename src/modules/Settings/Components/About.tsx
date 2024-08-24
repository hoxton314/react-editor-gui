import { observer } from 'mobx-react'
import { FC } from 'react'
import { AboutContainer, SectionTitle, HighlightedText } from '../Settings.styles'

export const About: FC = observer(() => {
  return (
    <AboutContainer>
      <SectionTitle>React Editor Demo</SectionTitle>

      <div>
        Version: <HighlightedText>{'Demo 1.1.0'}</HighlightedText>
      </div>
      <div>
        By: <HighlightedText>Igor Kaliciński</HighlightedText>
      </div>
    </AboutContainer>
  )
})
