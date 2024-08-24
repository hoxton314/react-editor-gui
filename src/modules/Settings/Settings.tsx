import { observer } from 'mobx-react'
import { FC } from 'react'
import { CategoriesContainer, SettingsComponent, SettingsTitle } from './Settings.styles'
import { ThemeImporter } from './Components/ThemeImporter'
import { ThemeSelector } from './Components/ThemeSelector'
import { About } from './Components/About'
import { Preferences } from './Components/Preferences'
import { Wipe } from './Components/Wipe'

export const Settings: FC = observer(() => {
  return (
    <SettingsComponent>
      <SettingsTitle>Settings</SettingsTitle>

      <CategoriesContainer>
        <Preferences />

        <ThemeSelector />

        <Wipe />

        <ThemeImporter />

        <About />
      </CategoriesContainer>
    </SettingsComponent>
  )
})
