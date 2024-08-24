interface TokenColor {
  scope: string | string[]
  settings: {
    fontStyle?: string
    foreground: string
  }
}

export interface VSCodeThemeJSON {
  $schema: string
  colors: {
    [key: string]: string
  }
  name: string
  semanticHighlighting: boolean
  semanticTokenColors: {
    [key: string]: {
      foreground: string
    }
  }
  tokenColors: TokenColor[]
}

export type Json = {
  textColor: string
  textSecondaryColor: string
  headlineColor: string
  backgroundColor: string
  lineHeight: string
  linePadding: string
  borderDefault: string
  borderFocused: string
  borderInvalid: string
  selectionMatch: string
  activeLineGutter: string
  activeLine: string
  activeSelection: string
  dividerColor: string
  spacing: '4px'
  contentPadding: `calc(4px / 2)`
  borderRadius: '8px'
}

export interface Theme extends VSCodeThemeJSON {
  themeName: string
  breakpoints: {
    mobile: string
    tablet: string
    desktop: string
    desktopLarge: string
  }
  fonts: {
    size: number
    family: string
    familyVariant: string
  }
  animations: {
    enabled: boolean
    duration: string
    function: string
  }
  loadingSpinner: {
    primary: string
    bgColor: string
    bgIframe: string
  }
}
