import { FC, HTMLProps } from 'react'
import { styled } from 'styled-components'

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0px 12px;
  border: 1px solid ${({ theme }) => theme.colors['sideBar.foreground']};
  color: ${({ theme }) => theme.colors['sideBar.foreground']};
  background: transparent;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors['badge.background']};
  }
`

interface TextInputProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextInput: FC<TextInputProps> = (props) => {
  return (
    <Input
      {...props}
      onClick={(e) => {
        !!props?.onClick && props.onClick(e)
        e.currentTarget.focus()
      }}
      onChange={(e) => {
        !!props?.onChange && props.onChange(e)
      }}
    />
  )
}
