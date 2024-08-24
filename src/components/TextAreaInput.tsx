import { FC, HTMLProps } from 'react'
import { styled } from 'styled-components'

export const TextArea = styled.textarea`
  width: 100%;
  height: 160px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors['sideBar.foreground']};
  color: ${({ theme }) => theme.colors['sideBar.foreground']};
  background: transparent;
  resize: none;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors['badge.background']};
  }
`

interface TextAreaProps extends Omit<HTMLProps<HTMLTextAreaElement>, 'onChange'> {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextAreaInput: FC<TextAreaProps> = (props) => {
  return (
    <TextArea
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
