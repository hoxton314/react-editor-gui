import { observer } from 'mobx-react'
import { DetailedHTMLProps, FC, HTMLAttributes, useContext } from 'react'
import { StoreContext } from '@components/App'
import { DraggableBorder } from '@styles/generic.styles'
import { WindowContainer } from '../TabbedCodeView.styles'
import { ClientWindow } from './WindowTypes/ConfigurationWindow'
import { GetStartedWindow } from './WindowTypes/GetStartedWindow'
import { JSONPreviewWindow } from './WindowTypes/JSONPreviewWindow'
import { UserDetailsWindow } from './WindowTypes/UserDetailsWindow'
import { GroupDetailsWindow } from './WindowTypes/GroupDetailsWindow'
import { PermissionDetailsWindow } from './WindowTypes/PermissionDetailsWindow'
import { Empty } from './WindowTypes/Empty'

interface WindowComponentProps {
  horizontalDragBarProps?: Omit<DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>, 'ref'>
  isHorizontalDragging?: boolean
  horizontalPosition?: 'left' | 'right'
}

export const WindowComponent: FC<WindowComponentProps> = observer(
  ({ horizontalDragBarProps, isHorizontalDragging, horizontalPosition }) => {
    const store = useContext(StoreContext)
    const { windowsActiveTabs, isHorizontalSplit } = store.CodeViewState

    const activeTab = windowsActiveTabs[horizontalPosition]

    const renderWindowBody = () => {
      switch (activeTab?.type) {
        case 'get-started':
          return <GetStartedWindow />
        case 'configuration':
          return <ClientWindow side={horizontalPosition} />
        case 'user':
          return <UserDetailsWindow side={horizontalPosition} />
        case 'group':
          return <GroupDetailsWindow side={horizontalPosition} />
        case 'permission':
          return <PermissionDetailsWindow side={horizontalPosition} />
        case 'json-preview':
          return <JSONPreviewWindow side={horizontalPosition} />
        default:
          return <Empty />
      }
    }

    return (
      <WindowContainer
        $isOnlyChild={!isHorizontalSplit}
        onClick={() => {
          store.CodeViewState.setCurrentlyFocusedWindow(horizontalPosition)
        }}
      >
        {renderWindowBody()}
        {horizontalDragBarProps && (
          <DraggableBorder {...horizontalDragBarProps} $align="right" $isDragging={isHorizontalDragging} />
        )}
      </WindowContainer>
    )
  },
)
