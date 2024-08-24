import { Checkbox } from '@/components/Checkbox'
import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { SettingComponent } from '../SettingComponent'
import { SectionTitle, CheckboxRow } from '../Settings.styles'
import { StoreContext } from '@/components/App'
import { useTheme } from 'styled-components'

export const Preferences: FC = observer(() => {
  const store = useContext(StoreContext)
  const { experimentalFeatures } = store.AppState
  const { rightSidebar } = store.UserInterfaceState
  const theme = useTheme()

  return (
    <SettingComponent>
      <SectionTitle>Preferences</SectionTitle>

      <CheckboxRow>
        <Checkbox
          value={theme.animations.enabled}
          onChange={() => {
            store.ThemeState.toggleAnimations()
          }}
        />
        <label
          onClick={() => {
            store.ThemeState.toggleAnimations()
          }}
        >
          Animations enabled.
        </label>
      </CheckboxRow>

      <CheckboxRow>
        <Checkbox
          value={rightSidebar.shouldHideOnEmpty}
          onChange={() => {
            store.UserInterfaceState.setRightSidebarShouldHideOnEmpty(!rightSidebar.shouldHideOnEmpty)
          }}
        />
        <label
          onClick={() => {
            store.UserInterfaceState.setRightSidebarShouldHideOnEmpty(!rightSidebar.shouldHideOnEmpty)
          }}
        >
          Hide right sidebar when empty.
        </label>
      </CheckboxRow>

      <CheckboxRow>
        <Checkbox
          value={experimentalFeatures}
          onChange={() => {
            store.AppState.toggleExperimentalFeatures()
          }}
        />
        <label
          onClick={() => {
            store.AppState.toggleExperimentalFeatures()
          }}
        >
          Experimental features.
        </label>
      </CheckboxRow>
    </SettingComponent>
  )
})
