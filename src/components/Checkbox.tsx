import { observer } from 'mobx-react'
import { FC } from 'react'
import { styled } from 'styled-components'

const CheckboxCheck = styled.div<{ $checked?: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${({ theme }) => theme.colors['badge.background']};
  opacity: ${({ $checked }) => ($checked ? 1 : 0)};
  transition: opacity 0.2s;
`

const CheckboxContainer = styled.div<{ $checked?: boolean }>`
  width: 16px;
  height: 16px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors['sideBar.foreground']};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    filter: brightness(1.4);

    ${CheckboxCheck} {
      opacity: ${({ $checked }) => ($checked ? 1 : 0.25)};
    }
  }
`

interface CheckboxProps {
  value: boolean
  onChange?: (boolean) => void
}

export const Checkbox: FC<CheckboxProps> = observer(({ value, onChange }) => {
  return (
    <CheckboxContainer
      $checked={value}
      onClick={() => {
        !!onChange && onChange(!value)
      }}
    >
      <CheckboxCheck $checked={value} />
    </CheckboxContainer>
  )
})
