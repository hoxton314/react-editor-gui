import { FC, useContext } from 'react'
import { ToolboxContainer, ToolboxButton } from './Toolbox.styles'
import { observer } from 'mobx-react'
import { StoreContext } from '@components/App'
import { EditIcon } from '@components/Icons/EditIcon'
import { SplitIcon } from '@components/Icons/SplitIcon'
import { CopyIcon } from '@components/Icons/CopyIcon'
import { SaveIcon } from '@components/Icons/SaveIcon'
import { AddIcon } from '@/components/Icons/AddIcon'
import { DiscardIcon } from '@/components/Icons/DiscardIcon'
import { Side } from '@/store/CodeView.store'
import { toggleEditModeInTab, handleChangeConfig, handleDeleteConfig, handleCopyToClipboard } from './methods'
import { DeleteThinIcon } from '@/components/Icons/DeleteThin'
import { ShapesIcon } from '@/components/Icons/ShapesIcon'

interface ToolboxProps {
  isTransparent?: boolean
  side: Side
}

export const Toolbox: FC<ToolboxProps> = observer(({ isTransparent, side }) => {
  const store = useContext(StoreContext)
  const { windowsActiveTabs } = store.CodeViewState

  const tabType = windowsActiveTabs[side]?.type
  const isConfigTab = tabType === 'configuration'
  const isEditing = windowsActiveTabs[side]?.isEditing
  const canEdit = windowsActiveTabs[side]?.hasEditRights
  const canDelete = windowsActiveTabs[side]?.hasDeleteRights

  const openAddContextMenu = async (e) => {
    await new Promise((resolve) => setTimeout(resolve, 10))

    let parent = e.target as HTMLElement
    while (parent) {
      if (parent.getAttribute('data-context-menu')) {
        break
      }
      parent = parent.parentElement
    }

    store.UserInterfaceState.setContextMenuData({
      isVisible: true,
      type: 'toolbox-add-btn',
      style: 'dropdown',
      contextId: 'toolbox-add-btn',
      position: { x: e.clientX, y: e.clientY },
      parentBoundingRect: parent.getBoundingClientRect(),
    })
  }

  const openDropdown = async (e, type) => {
    await new Promise((resolve) => setTimeout(resolve, 10))

    let parent = e.target as HTMLElement
    while (parent) {
      if (parent.getAttribute('data-context-menu')) {
        break
      }
      parent = parent.parentElement
    }

    store.UserInterfaceState.setContextMenuData({
      isVisible: true,
      type: type,
      style: 'dropdown',
      contextId: side,
      position: { x: e.clientX, y: e.clientY },
      parentBoundingRect: parent.getBoundingClientRect(),
    })
  }

  return (
    <ToolboxContainer $isTransparent={isTransparent} className="ToolboxBig">
      <ToolboxButton
        title="Toolbox"
        onClick={(e) => openDropdown(e, 'toolbox-tab-dropdown')}
        data-context-menu="toolbox-tab-dropdown"
        data-context-menu-id={side}
      >
        <ShapesIcon />
      </ToolboxButton>

      <ToolboxButton
        title="Toggle split view"
        onClick={() => {
          store.CodeViewState.toggleHorizontalSplit()
        }}
      >
        <SplitIcon />
      </ToolboxButton>

      {isConfigTab && canEdit && !isEditing && (
        <ToolboxButton title="Edit config" onClick={toggleEditModeInTab}>
          <EditIcon />
        </ToolboxButton>
      )}

      {isConfigTab && canEdit && isEditing && (
        <ToolboxButton title="Save & upload config" onClick={() => handleChangeConfig(side)}>
          <SaveIcon />
        </ToolboxButton>
      )}

      {isConfigTab && canEdit && isEditing && (
        <ToolboxButton title="Cancel edit" onClick={toggleEditModeInTab}>
          <DiscardIcon />
        </ToolboxButton>
      )}

      {isConfigTab && canDelete && (
        <ToolboxButton
          title="Delete config"
          onClick={() => {
            handleDeleteConfig(side)
          }}
        >
          <DeleteThinIcon />
        </ToolboxButton>
      )}

      {windowsActiveTabs[side]?.jsonObject && (
        <ToolboxButton title="Copy object" onClick={() => handleCopyToClipboard(side)}>
          <CopyIcon />
        </ToolboxButton>
      )}

      <ToolboxButton
        title="Add"
        onClick={openAddContextMenu}
        data-context-menu={`toolbox-add-btn`}
        data-context-menu-id={`toolbox-add-btn`}
        data-context-menu-style="dropdown"
      >
        <AddIcon />
      </ToolboxButton>
    </ToolboxContainer>
  )
})
