import Bearded_BlackRubySoft from './templates/bearded-theme-black-&-ruby-soft.json'
import { themeMap } from './themeMap'
import { commonTheme } from './common.theme'
import { Theme, VSCodeThemeJSON } from './theme'

const resolveImportedTheme = () => {
  try {
    const localStorageTheme = localStorage.getItem('customThemeFile')
    const parsedThemeFile = JSON.parse(localStorageTheme as string)
    if (parsedThemeFile?.colors && parsedThemeFile?.name) {
      return parsedThemeFile as VSCodeThemeJSON
    }
  } catch (error) {
    console.log(error)
  }

  return Bearded_BlackRubySoft as VSCodeThemeJSON
}

export const themeComputed = (themeName: string): Theme => {
  const colorTheme = themeName === 'imported' ? resolveImportedTheme() : themeMap[themeName]

  return {
    themeName: colorTheme?.name,
    ...colorTheme,
    ...commonTheme,
    loadingSpinner: {
      primary: colorTheme.colors['editor.foreground'],
      bgColor: colorTheme.colors['editor.background'],
      bgIframe: colorTheme.colors['editor.background'],
    },
  }
}
