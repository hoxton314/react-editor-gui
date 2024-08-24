import { DetailedHTMLProps, FC, HTMLAttributes, useContext, useEffect, useState } from 'react'
import { RightBarWrapper } from './RightSidebar.styles'
import { DraggableBorder } from '@styles/generic.styles'
import { observer } from 'mobx-react'
import { StoreContext } from '@components/App'
import { ConfigurationDetails } from './Templates/ConfigurationDetails/ConfigurationDetails'
import { AccessManagement } from './Templates/AccessManagement'

interface RightSidebarProps {
  dragBarProps: Omit<DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>, 'ref'>
  isResizing: boolean
}
export const RightSidebar: FC<RightSidebarProps> = observer(({ dragBarProps, isResizing }) => {
  const store = useContext(StoreContext)
  const { currentlyFocusedWindow, windowsActiveTabs } = store.CodeViewState
  const { isRightSidebarVisible } = store.UserInterfaceState

  const focusedTab = windowsActiveTabs[currentlyFocusedWindow]

  const [SidebarBody, setSidebarBody] = useState<FC | null>(null)

  useEffect(() => {
    const hasReferences = !!focusedTab?.configurationData?.references?.length
    const hasVersions = !!focusedTab?.configurationData?.versions?.length

    switch (focusedTab?.type) {
      case 'configuration':
        store.UserInterfaceState.setRightSidebarEmpty(!hasReferences && !hasVersions)
        setSidebarBody(ConfigurationDetails)
        break
      case 'user':
      case 'group':
      case 'permission':
        store.UserInterfaceState.setRightSidebarEmpty(false)
        setSidebarBody(AccessManagement)
        break
      default:
        store.UserInterfaceState.setRightSidebarEmpty(true)
        break
    }
  }, [focusedTab])

  if (!isRightSidebarVisible) {
    return <></>
  }

  return (
    <RightBarWrapper>
      {SidebarBody && <SidebarBody />}

      <DraggableBorder {...dragBarProps} $align="left" $isDragging={isResizing} />
    </RightBarWrapper>
  )
})
