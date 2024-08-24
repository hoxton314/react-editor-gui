import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { SettingsCategory, SectionTitle } from '../Settings.styles'
import { StoreContext } from '@/components/App'
import { Select } from '@/styles/generic.styles'
import { SelectItem } from '@/types/General'
import { themeMap } from '@/themes/themeMap'

const themeSelectOptions = [
  ...Object.keys(themeMap).map((themeName) => ({ value: themeName, label: themeName })),
  { value: 'imported', label: 'Imported theme' },
]

export const ThemeSelector: FC = observer(() => {
  const store = useContext(StoreContext)
  const { selectedThemeNames } = store.ThemeState

  return (
    <SettingsCategory>
      <SectionTitle>Select preferred themes:</SectionTitle>
      <Select
        options={themeSelectOptions}
        value={
          selectedThemeNames.map((themeName) => ({
            value: themeName,
            label: themeName,
          })) as SelectItem[]
        }
        onChange={(e: SelectItem[]) => store.ThemeState.setSelectedThemeNames(e.map((item) => item.value))}
        isMulti
        $height="120px"
        $isClearButtonHidden
      />
    </SettingsCategory>
  )
})
