import { FC, MouseEventHandler, PropsWithChildren } from 'react'
import { StyledThemeSwitcher } from './ThemeSwitcher.styles'

type Props = {
  link?: string
  active?: boolean
  onClick?: MouseEventHandler
}

export const ThemeSwitcher: FC<PropsWithChildren<Props>> = (props) => {
  return (
    <StyledThemeSwitcher onClick={props.onClick}>
      <div>{props.children}</div>
    </StyledThemeSwitcher>
  )
}
