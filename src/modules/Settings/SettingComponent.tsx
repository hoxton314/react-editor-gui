import { FC, useEffect, useState } from 'react'
import { SettingsCategory, SettingsCategoryProps } from './Settings.styles'

const animationDuration = 200

interface SettingComponentProps {
  children?: React.ReactNode
  width?: string
  visible?: boolean
}

export const SettingComponent: FC<SettingComponentProps> = ({ children, width, visible = true }) => {
  const [shouldRender, setShouldRender] = useState(visible)

  const [fade, setFade] = useState<SettingsCategoryProps['$fadeState']>('fade')

  useEffect(() => {
    if (visible) {
      setShouldRender(true)
      setTimeout(() => {
        setFade('fade')
      }, animationDuration)
    } else {
      setFade('fade-exit')
      setTimeout(() => {
        setShouldRender(false)
      }, animationDuration)
    }
  }, [visible])

  return (
    <>
      {shouldRender && (
        <SettingsCategory $width={width} $fadeState={fade} $animationDuration={animationDuration}>
          {children}
        </SettingsCategory>
      )}
    </>
  )
}
