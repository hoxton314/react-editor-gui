import { FC, useCallback, useContext, useRef } from 'react'
import { observer } from 'mobx-react'
import { ContextMenuContainer } from './ContextMenu.styles'
import { StoreContext } from '../App'
import { createPortal } from 'react-dom'
import useClickOutside from '../../hooks/useClickOutside'
import { TabMenu } from './ContextMenuTypes/TabMenu'
import { ConfigurationListItemMenu } from './ContextMenuTypes/ConfigurationListItemMenu'
import {
  GroupItemContextMenu,
  PermissionItemContextMenu,
  UserItemContextMenu,
} from './ContextMenuTypes/AccessManagementMenus'
import { ToolboxAddButtonMenu } from './ContextMenuTypes/ToolboxAddButtonMenu'
import { rootStore } from '@/store/Root.store'
import { ContextMenuType } from '@store/UserInterface.store'
import { ToolboxDropdown } from './ContextMenuTypes/ToolboxDropdown'
import { OpenedTabsDropdown } from './ContextMenuTypes/OpenedTabsDropdown'

export const onContextMenu = (e) => {
  e.preventDefault()
  e.stopPropagation()

  // iterate over parents of clicked element until we find the "context-menu" attribute in element
  let parent = e.target
  let contextMenu = ''
  while (parent) {
    if (parent.getAttribute('data-context-menu')) {
      contextMenu = parent.getAttribute('data-context-menu')
      break
    }
    parent = parent.parentElement
  }

  if (contextMenu) {
    rootStore.UserInterfaceState.setContextMenuData({
      isVisible: true,
      type: contextMenu as ContextMenuType,
      style: parent.getAttribute('data-context-menu-style') || 'default',
      contextId: parent.getAttribute('data-context-menu-id'),
      contextProperty: parent.getAttribute('data-context-menu-property'),
      position: { x: e.clientX, y: e.clientY },
      parentBoundingRect: parent.getBoundingClientRect(),
    })
  } else {
    return false
  }
}

export const ContextMenu: FC = observer(() => {
  const store = useContext(StoreContext)
  const { contextMenu } = store.UserInterfaceState

  const contextMenuRef = useRef<HTMLDivElement>()

  const closeMenu = useCallback(() => {
    store.UserInterfaceState.hideContextMenu()
  }, [])

  useClickOutside(contextMenuRef, closeMenu)

  const renderMenuItems = () => {
    switch (contextMenu?.type) {
      case 'tab':
        return <TabMenu />
      case 'configuration-list-item':
        return <ConfigurationListItemMenu />
      case 'user-list-item':
        return <UserItemContextMenu />
      case 'group-list-item':
        return <GroupItemContextMenu />
      case 'permission-list-item':
        return <PermissionItemContextMenu />
      case 'toolbox-add-btn':
        return <ToolboxAddButtonMenu />
      case 'toolbox-action-dropdown':
        return <ToolboxDropdown />
      case 'toolbox-tab-dropdown':
        return <OpenedTabsDropdown />
      default:
        return <></>
    }
  }
  return createPortal(
    <ContextMenuContainer
      ref={contextMenuRef}
      $isVisible={contextMenu?.isVisible}
      $posX={contextMenu?.position?.x}
      $posY={contextMenu?.position?.y}
      $style={contextMenu?.style}
      $parentBoundingRect={contextMenu?.parentBoundingRect}
      onClick={closeMenu}
    >
      {renderMenuItems()}
    </ContextMenuContainer>,
    document.body,
  )
})
