import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { StoreContext } from '../../App'
import { MenuItem, MenuItemSeparator } from '../ContextMenu.styles'
import { copyToClipboard } from '@/methods/copyToClipboard'

export const UserItemContextMenu: FC = observer(() => {
  const store = useContext(StoreContext)
  const { usersList } = store.CommunicationState
  const { contextMenu } = store.UserInterfaceState
  const { currentlyFocusedWindow } = store.CodeViewState

  const user = usersList.find((user) => user.id === contextMenu.contextId)

  const handleOpeningTab = () => {
    if (!user) return

    store.CodeViewState.addTab({
      tab: {
        title: user.name,
        type: 'user',
        userData: user,
      },
      side: currentlyFocusedWindow,
    })
  }

  const copyId = () => {
    copyToClipboard(contextMenu?.contextId)
  }

  const copyProperty = (property?: string) => {
    const prop = property || contextMenu?.contextProperty

    if (!user[prop]) return

    copyToClipboard(user[prop])
  }

  return (
    <>
      <MenuItem onClick={handleOpeningTab}>Open</MenuItem>
      {!!contextMenu?.contextProperty && <MenuItem onClick={() => copyProperty()}>Copy</MenuItem>}
      {/* <MenuItem>Open right</MenuItem>
      <MenuItem>Open left</MenuItem> */}
      <MenuItemSeparator />
      <MenuItem onClick={copyId}>Copy user ID</MenuItem>
      <MenuItem onClick={() => copyProperty('entraUserId')} disabled={!user?.entraUserId}>
        Copy entra user ID
      </MenuItem>
      <MenuItem onClick={() => copyProperty('name')}>Copy user name</MenuItem>
      <MenuItem onClick={() => copyProperty('email')}>Copy user email</MenuItem>
      <MenuItemSeparator />
      <MenuItem>Delete user</MenuItem>
    </>
  )
})

export const GroupItemContextMenu: FC = observer(() => {
  const store = useContext(StoreContext)
  const { groupsList } = store.CommunicationState
  const { contextMenu } = store.UserInterfaceState
  const { currentlyFocusedWindow } = store.CodeViewState

  const group = groupsList.find((group) => group.id === contextMenu.contextId)

  const handleOpeningTab = () => {
    store.CodeViewState.addTab({
      tab: {
        title: group.name,
        type: 'group',
        groupData: group,
      },
      side: currentlyFocusedWindow,
    })
  }

  const copyId = () => {
    copyToClipboard(contextMenu?.contextId)
  }

  const copyProperty = () => {
    if (!group[contextMenu?.contextProperty]) return

    copyToClipboard(group[contextMenu?.contextProperty])
  }

  return (
    <>
      <MenuItem onClick={handleOpeningTab}>Open</MenuItem>
      {!!contextMenu?.contextProperty && <MenuItem onClick={() => copyProperty()}>Copy</MenuItem>}
      {/* <MenuItem>Open right</MenuItem>
      <MenuItem>Open left</MenuItem> */}
      <MenuItemSeparator />
      <MenuItem onClick={copyId}>Copy group ID</MenuItem>
      <MenuItem>Delete group</MenuItem>
    </>
  )
})

export const PermissionItemContextMenu: FC = observer(() => {
  const store = useContext(StoreContext)
  const { permissionsList } = store.CommunicationState
  const { contextMenu } = store.UserInterfaceState
  const { currentlyFocusedWindow } = store.CodeViewState

  const permission = permissionsList.find((permission) => {
    const { resourceName, resourceType, operation } = permission
    const id = resourceName + resourceType + operation
    return id === contextMenu.contextId
  })

  const handleOpeningTab = () => {
    if (!permission) return

    store.CodeViewState.addTab({
      tab: {
        title: permission.resourceName,
        type: 'permission',
        permissionData: permission,
      },
      side: currentlyFocusedWindow,
    })
  }

  const copyProperty = (property?: string) => {
    const prop = property || contextMenu?.contextProperty

    if (!permission[prop]) return

    copyToClipboard(permission[prop])
  }

  return (
    <>
      <MenuItem onClick={handleOpeningTab}>Open</MenuItem>
      {!!contextMenu?.contextProperty && <MenuItem onClick={() => copyProperty()}>Copy</MenuItem>}
      {/* <MenuItem>Open right</MenuItem>
      <MenuItem>Open left</MenuItem> */}
      <MenuItemSeparator />
      <MenuItem onClick={() => copyProperty('resourceName')}>Copy permission resource name</MenuItem>
      <MenuItem onClick={() => copyProperty('resourceType')}>Copy permission resource type</MenuItem>
      <MenuItem onClick={() => copyProperty('operation')}>Copy permission operation type</MenuItem>
      <MenuItemSeparator />
      <MenuItem>Delete permission</MenuItem>
    </>
  )
})
