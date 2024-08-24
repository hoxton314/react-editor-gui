import { observer } from 'mobx-react'
import { FC, useCallback, useContext, useMemo, useState } from 'react'
import { StoreContext } from '@components/App'
import { AccessList, DeleteButton, StyledAccessListHeader, StyledAccessListItem } from '../../LeftSidebar.styles'
import { Permission } from '@customTypes/Permissions'
import { Side, TabList } from '@store/CodeView.store'
import { DeleteIcon } from '@/components/Icons/DeleteIcon'
import { deletePermission } from '@/communication/Permissions'

const getPermId = (perm?: Permission) => perm?.resourceName + perm?.resourceType + perm?.operation

// #TODO: reimplement hover logic to prevent full rerender on each mouse enter/leave event
const isPermTabAlreadyOpened = (tabList: TabList, perm: Permission) => {
  return Object.values(tabList).some((tab) => JSON.stringify(tab.permissionData) === JSON.stringify(perm))
}

const PermissionRow: FC<{ permission: Permission }> = observer(({ permission }) => {
  const store = useContext(StoreContext)
  const { currentlyFocusedWindow, windowsState } = store.CodeViewState
  const { resourceName, resourceType, operation } = permission
  const id = getPermId(permission)

  const [isHovering, setIsHovering] = useState(false)

  const isActive = isPermTabAlreadyOpened(store.CodeViewState.windowsState.tabs, permission)
  const isCurrentlyViewing =
    store.CodeViewState.windowsActiveTabs[store.CodeViewState.currentlyFocusedWindow]?.permissionData === permission

  const handleOpeningTab = (permission: Permission) => {
    store.CodeViewState.addTab({
      tab: {
        title: permission.resourceName,
        type: 'permission',
        permissionData: permission,
      },
      side: currentlyFocusedWindow,
    })
  }

  const switchToTab = (permission: Permission) => {
    let tabId = windowsState.left.openedTabs.find((tabId) => getPermId(windowsState.tabs[tabId].permissionData) === id)
    let side: Side = 'left'

    if (!tabId) {
      tabId = windowsState.right.openedTabs.find((tabId) => getPermId(windowsState.tabs[tabId].permissionData) === id)
      side = 'right'
    }

    if (!tabId) {
      handleOpeningTab(permission)
    } else {
      store.CodeViewState.setActiveTab({ id: tabId, side })
    }
  }

  const handleModalConfirmation = (e) => {
    e.stopPropagation()
    store.ModalState.setConfirmationModalData({
      operation: 'delete',
      highlightedText: permission.resourceName + '/' + permission.resourceType + '/' + permission.operation,
      onConfirm: async () => await deletePermission(permission),
    })

    store.ModalState.openModal('confirmation')
  }

  const handleClick = useCallback(() => {
    if (isActive) {
      switchToTab(permission)
    } else {
      handleOpeningTab(permission)
    }
  }, [permission, isActive, currentlyFocusedWindow])

  const itemProps = useMemo(() => {
    return {
      onClick: handleClick,
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => setIsHovering(false),
      'data-context-menu': `permission-list-item`,
      'data-context-menu-id': permission?.resourceName + permission?.resourceType + permission?.operation,
      $isHovering: isHovering,
      $isCurrentlyViewing: isCurrentlyViewing,
      $active: isActive,
    }
  }, [permission, isHovering, isCurrentlyViewing, isActive])

  return [
    <StyledAccessListItem {...itemProps} key={id + 'name'} data-context-menu-property={'resourceName'}>
      <span>{resourceName}</span>
    </StyledAccessListItem>,
    <StyledAccessListItem {...itemProps} key={id + 'type'} data-context-menu-property={'resourceType'}>
      <span>{resourceType}</span>
    </StyledAccessListItem>,
    <StyledAccessListItem {...itemProps} key={id + 'operation'} data-context-menu-property={'operation'}>
      <span>{operation}</span>
      <DeleteButton $visible={isHovering} onClick={handleModalConfirmation}>
        <DeleteIcon size={16} />
      </DeleteButton>
    </StyledAccessListItem>,
  ]
})

export const PermissionsList: FC = observer(() => {
  const store = useContext(StoreContext)
  const { permissionsList } = store.CommunicationState

  return (
    <AccessList $colCount={3}>
      <StyledAccessListHeader>Name</StyledAccessListHeader>
      <StyledAccessListHeader>Type</StyledAccessListHeader>
      <StyledAccessListHeader>Operation</StyledAccessListHeader>
      {permissionsList.map((permission, index) => (
        <PermissionRow key={index} permission={permission} />
      ))}
    </AccessList>
  )
})
