import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { MenuItem, MenuItemSeparator } from '../ContextMenu.styles'
import { StoreContext } from '../../App'
import { Side } from '@/store/CodeView.store'
import {
  toggleEditModeInTab,
  handleChangeConfig,
  handleDeleteConfig,
  handleCopyToClipboard,
} from '@modules/TabbedCodeView/TabManager/Toolbox/methods'

interface ToolboxDropdownProps {}

export const ToolboxDropdown: FC<ToolboxDropdownProps> = observer(() => {
  const store = useContext(StoreContext)
  const { contextMenu } = store.UserInterfaceState
  const { windowsActiveTabs } = store.CodeViewState

  const side = contextMenu.contextId as Side
  const tabType = windowsActiveTabs[side]?.type
  const isConfigTab = tabType === 'configuration'
  const isEditing = windowsActiveTabs[side]?.isEditing
  const canEdit = windowsActiveTabs[side]?.hasEditRights
  const canDelete = windowsActiveTabs[side]?.hasDeleteRights

  const shouldDisplaySeparator = canEdit || canDelete

  return (
    <>
      <MenuItem
        onClick={() => {
          store.CodeViewState.toggleHorizontalSplit()
        }}
      >
        Toggle split view
      </MenuItem>
      {isConfigTab && canEdit && !isEditing && <MenuItemSeparator />}
      {isConfigTab && canEdit && !isEditing && <MenuItem onClick={toggleEditModeInTab}>Edit config</MenuItem>}
      {isConfigTab && canEdit && isEditing && (
        <MenuItem onClick={() => handleChangeConfig(side)}>Save & upload config</MenuItem>
      )}
      {isConfigTab && canEdit && isEditing && <MenuItem onClick={toggleEditModeInTab}>Cancel edit</MenuItem>}
      {isConfigTab && canDelete && <MenuItem onClick={() => handleDeleteConfig(side)}>Delete config</MenuItem>}
      {isConfigTab && shouldDisplaySeparator && <MenuItemSeparator />}
      {windowsActiveTabs[side]?.jsonObject && (
        <MenuItem onClick={() => handleCopyToClipboard(side)}>Copy object</MenuItem>
      )}
      <MenuItemSeparator />
      <MenuItem onClick={() => store.ModalState.openModal('add-configuration')}>Create configuration</MenuItem>
      <MenuItem onClick={() => store.ModalState.openModal('add-user')}>Add user</MenuItem>
      <MenuItem onClick={() => store.ModalState.openModal('add-group')}>Add group</MenuItem>
      <MenuItem onClick={() => store.ModalState.openModal('add-permission')}>Add permission</MenuItem>
    </>
  )
})
