import { FC } from 'react'
import Switch, { ReactSwitchProps } from 'react-switch'
import { useTheme } from 'styled-components'

export const SwitchInput: FC<ReactSwitchProps> = (props) => {
  const theme = useTheme()

  const switchProps = {
    offColor: '#888',
    onColor: theme.colors.tertiary,
    onHandleColor: theme.colors.secondary,
    handleDiameter: 30,
    uncheckedIcon: false,
    checkedIcon: false,
    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.6)',
    activeBoxShadow: '0px 0px 1px 10px rgba(0, 0, 0, 0.2)',
    height: 20,
    width: 48,
    borderRadius: 14,

    ...props,
  }

  return <Switch {...switchProps} />
}
