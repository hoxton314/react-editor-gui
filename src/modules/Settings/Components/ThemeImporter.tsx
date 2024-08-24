import { observer } from 'mobx-react'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { SectionTitle, SettingsButton, HighlightedText } from '../Settings.styles'
import { InvisibleInput } from '@/styles/generic.styles'
import { StoreContext } from '@/components/App'
import { SettingComponent } from '../SettingComponent'

interface ThemeFile {
  $schema: string
  //eslint-disable-next-line
  colors: any
  //eslint-disable-next-line
  tokenColors: any
  name: string
}

export const ThemeImporter: FC = observer(() => {
  const store = useContext(StoreContext)
  const { selectedThemeNames } = store.ThemeState
  const { experimentalFeatures } = store.AppState

  const [themeFile, setThemeFile] = useState<ThemeFile>()

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('customThemeFile')
    validateGivenJson(localStorageTheme)
  }, [])

  const validateGivenJson = (themeFile: string | null, customName?: string) => {
    if (!themeFile) return

    console.log(themeFile)

    try {
      const parsedThemeFile = JSON.parse(themeFile)

      console.log(parsedThemeFile)

      if (customName && !parsedThemeFile?.name) {
        parsedThemeFile.name = customName
      }

      console.log(parsedThemeFile)

      if (parsedThemeFile?.colors && parsedThemeFile?.name) {
        setThemeFile(parsedThemeFile)
        localStorage.setItem('customThemeFile', JSON.stringify(parsedThemeFile))
      } else {
        // toast
        console.log('Given json is not a valid VSCode theme')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        validateGivenJson(result, file?.name)
      }
      reader.readAsText(file)
    }
  }

  return (
    <SettingComponent visible={experimentalFeatures}>
      <SectionTitle>Import your own theme json file (experimental)</SectionTitle>
      <span>
        Imported VSCode theme: <HighlightedText>{themeFile?.name || 'not imported'}</HighlightedText>
      </span>
      <SettingsButton
        onClick={() => {
          if (fileInputRef.current) {
            fileInputRef.current.click()
          }
        }}
      >
        Import
      </SettingsButton>
      <InvisibleInput ref={fileInputRef} onChange={handleFileChange} type="file" accept=".json" />

      <SettingsButton
        disabled={!themeFile?.colors || !themeFile?.name}
        onClick={() => {
          if (!selectedThemeNames.includes('imported')) {
            store.ThemeState.setSelectedThemeNames([...selectedThemeNames, 'imported'])
          }

          store.ThemeState.setCurrentThemeByName('imported')
        }}
      >
        Apply theme
      </SettingsButton>
    </SettingComponent>
  )
})
