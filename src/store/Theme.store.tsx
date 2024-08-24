import { action, computed, makeAutoObservable } from 'mobx'
import { Theme } from '@themes/theme'
import { themeComputed } from '@themes/themeComputed'
import { commonTheme } from '@themes/common.theme'

export class ThemeStore {
  rootStore

  animationsEnabled = localStorage.getItem('animations') === 'false' ? false : true

  selectedThemeNames: string[] = ['BeardedTheme Arc-eggplant', 'BeardedTheme Black-&-ruby']
  currentThemeIndex = 0

  get resolvedThemeObject(): Theme {
    return {
      ...themeComputed(this.selectedThemeNames[this.currentThemeIndex]),
      animations: {
        ...commonTheme.animations,
        enabled: this.animationsEnabled,
      },
    }
  }

  get isDefaultThemeState(): boolean {
    return (
      this.selectedThemeNames.length === 2 &&
      this.selectedThemeNames.includes('BeardedTheme Arc-eggplant') &&
      this.selectedThemeNames.includes('BeardedTheme Black-&-ruby')
    )
  }

  constructor(rootStore) {
    makeAutoObservable(this, {
      resolvedThemeObject: computed,
      isDefaultThemeState: computed,
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.rootStore = rootStore
    this.initTheme()
  }

  @action.bound initTheme() {
    const storedThemeNames = localStorage.getItem('selectedThemeNames')
    const storedThemeIndex = localStorage.getItem('currentThemeIndex')

    if (storedThemeNames?.length) {
      this.selectedThemeNames = JSON.parse(storedThemeNames)
    }

    if (storedThemeIndex?.length) {
      this.currentThemeIndex = parseInt(storedThemeIndex)
    }
  }

  @action.bound toggleAnimations() {
    this.animationsEnabled = !this.animationsEnabled
    localStorage.setItem('animations', this.animationsEnabled.toString())
  }

  @action.bound cycleTheme() {
    this.currentThemeIndex = (this.currentThemeIndex + 1) % this.selectedThemeNames.length

    // skipping imported when no custom theme is imported (Bearded_BlackRubySoft is the theme fallback)
    if (
      this.selectedThemeNames[this.currentThemeIndex] === 'imported' &&
      this.resolvedThemeObject?.name === 'BeardedTheme Black-&-ruby-soft'
    ) {
      this.currentThemeIndex += 1
    }

    localStorage.setItem('currentThemeIndex', this.currentThemeIndex.toString())
  }

  @action.bound setCurrentThemeByName(themeName: string) {
    const themeIndex = this.selectedThemeNames.indexOf(themeName)
    if (themeIndex !== -1) {
      this.currentThemeIndex = themeIndex
      localStorage.setItem('currentThemeIndex', this.currentThemeIndex.toString())
    }
  }

  @action.bound setSelectedThemeNames(themeNames: string[]) {
    if (!themeNames?.length) {
      themeNames = ['BeardedTheme Black-&-ruby-soft', 'BeardedTheme Milkshake-raspberry']
    }

    this.selectedThemeNames = themeNames
    localStorage.setItem('selectedThemeNames', JSON.stringify(themeNames))
    this.currentThemeIndex = 0
    localStorage.setItem('currentThemeIndex', this.currentThemeIndex.toString())
  }
}
