import { FC } from 'react'
import { SettingComponent } from '../SettingComponent'
import { SectionTitle, SettingsButton } from '../Settings.styles'

export const Wipe: FC = () => {
  return (
    <SettingComponent>
      <SectionTitle>Wipe local storage</SectionTitle>
      (helpful if you encounter any issues or new major version is released)
      <SettingsButton
        onClick={() => {
          localStorage.clear()
          window.location.reload()
        }}
      >
        Wipe
      </SettingsButton>
    </SettingComponent>
  )
}
