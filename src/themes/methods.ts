import { VSCodeThemeJSON } from './theme'

interface TokenColor {
  scope?: string | string[]
  settings?: {
    [key: string]: string
  }
}

export const getColorByScope = (scope: string, theme: VSCodeThemeJSON): TokenColor => {
  const tokenColors = theme.tokenColors

  const tokenIndex = tokenColors.findIndex((token) => token.scope === scope || token.scope?.includes(scope))

  if (!tokenIndex) {
    return {}
  }

  return tokenColors[tokenIndex]
}
