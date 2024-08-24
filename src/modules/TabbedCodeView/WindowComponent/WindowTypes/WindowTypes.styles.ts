import { Animatable } from '@/styles/generic.styles'
import { css, styled } from 'styled-components'

export const AccessManagementTabsContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
`

export const TabTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 39px;
`

export const VerticalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const VerticalListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const ValueTitle = styled.h4`
  color: ${({ theme }) => theme.colors['menu.foreground']};
  font-size: 14px;
  font-weight: 400;
`

export const Value = styled.div`
  color: ${({ theme }) => theme.colors['list.hoverForeground']};
  font-size: 16px;
  font-weight: 600;
`

export const VerticalListBordered = styled(VerticalList)<{ $clickable?: boolean }>`
  padding: 20px;
  ${({ theme }) => `border: 1px solid ${theme.colors['dropdown.border']};`}
  border-radius: 4px;
  width: 100%;

  ${({ $clickable }) =>
    $clickable &&
    css`
      &:hover {
        ${({ theme }) => `background-color: ${theme.colors['dropdown.border']};`}
        cursor: pointer;
      }

      ${Animatable}
    `}
`

export const VerticalListFlexWrapContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 355px));
  gap: 10px;
  width: 100%;
`
