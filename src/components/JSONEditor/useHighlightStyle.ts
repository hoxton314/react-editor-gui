import React from 'react'
import { tags } from '@lezer/highlight'
import { HighlightStyle } from '@codemirror/language'
import { useTheme } from 'styled-components'
import { getColorByScope } from '@themes/methods'

export const useHighlightStyle = (): HighlightStyle => {
  const theme = useTheme()

  return React.useMemo(
    () =>
      HighlightStyle.define([
        {
          tag: tags.propertyName,
          color:
            getColorByScope('punctuation.support.type.property-name.begin.json', theme)?.settings?.foreground ||
            'inherit',
        },
        {
          tag: tags.punctuation,
          color: getColorByScope('punctuation', theme)?.settings?.foreground || 'inherit',
        },
        {
          tag: tags.link,
          textDecoration: 'underline',
        },
        {
          tag: tags.heading,
          textDecoration: 'underline',
          fontWeight: 'bold',
        },
        {
          tag: tags.emphasis,
          fontStyle: 'italic',
        },
        {
          tag: tags.strong,
          fontWeight: 'bold',
        },
        {
          tag: tags.strikethrough,
          textDecoration: 'line-through',
        },
        {
          tag: [tags.bool, tags.url, tags.contentSeparator],
          color: getColorByScope('constant', theme)?.settings?.foreground || 'inherit',
        },
        {
          tag: [tags.literal, tags.inserted],
          color: getColorByScope('constant.numeric', theme)?.settings?.foreground || 'inherit',
        },
        {
          tag: [tags.brace],
          color:
            getColorByScope('punctuation.support.type.property-name.begin.json', theme)?.settings?.foreground ||
            'inherit',
        },
        {
          tag: [tags.bracket],
          color: theme.colors['editorBracketHighlight.foreground2'] || 'inherit',
        },
        {
          tag: [tags.string],
          color: getColorByScope('string', theme)?.settings?.foreground || 'inherit',
        },
        {
          tag: [tags.regexp, tags.escape, tags.special(tags.string)],
          color: getColorByScope('constant.character.escape.regexp', theme)?.settings?.foreground || 'inherit',
        },
        {
          tag: tags.comment,
          color: getColorByScope('comment', theme)?.settings?.foreground || 'inherit',
        },
        {
          tag: tags.invalid,
          color: '#ff0000',
        },
      ]),
    [theme],
  )
}
