import { styled } from 'styled-components'

export const Form = styled.div``

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin: 20px 0 8px 0;
`

export const JSONEditorWrapper = styled.div<{ $showBorder?: boolean }>`
  width: 100%;

  & > div {
    transition: border 0s;
    border: ${({ $showBorder, theme }) =>
      $showBorder ? `1px solid ${theme.colors['tab.activeBorderTop']}` : '1px solid transparent'};
  }
`

export const HighlightedText = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors['badge.background']};
`

export const ChangelogBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }

  p {
    font-size: 14px;
    margin: 0;
  }
`
