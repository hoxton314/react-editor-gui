import { observer } from 'mobx-react'
import { FC, useContext, useMemo } from 'react'
import { MenuItem, MenuItemSeparator } from '../ContextMenu.styles'
import { StoreContext } from '../../App'
import { copyToClipboard } from '@/methods/copyToClipboard'

export const TabMenu: FC = observer(() => {
  const store = useContext(StoreContext)
  const { contextMenu } = store.UserInterfaceState
  const { windowsState } = store.CodeViewState

  const side = windowsState.left.activeTabId === contextMenu?.contextId ? 'left' : 'right'

  const tab = useMemo(() => windowsState.tabs[contextMenu?.contextId], [windowsState.tabs, contextMenu?.contextId])
  const isConfigTab = useMemo(() => tab?.type === 'configuration', [tab?.type])
  const isUserTab = useMemo(() => tab?.type === 'user', [tab?.type])
  const isGroupTab = useMemo(() => tab?.type === 'group', [tab?.type])

  const closeTab = () => {
    store.CodeViewState.closeTab({ id: contextMenu?.contextId })
  }

  const closeOtherTabs = () => {
    store.CodeViewState.closeAllBackgroundTabs(contextMenu?.contextId)
  }

  const closeAllTabs = () => {
    store.CodeViewState.closeAllTabs(side)
  }

  const copyConfigToClipboard = () => {
    if (!tab) return
    copyToClipboard(JSON.stringify(tab, null, 4))
  }

  const copyCodeToClipboard = () => {
    if (!tab) return
    copyToClipboard(tab?.jsonObject)
  }

  const refreshTabContent = () => {
    if (!tab) return
    store.CodeViewState.updateTabValue({
      tabId: tab.id,
      isEditing: false,
      shouldRefetchData: true,
    })
  }

  const copyUserIDToClipboard = () => {
    if (!tab?.userData?.id) return
    copyToClipboard(tab?.userData?.id)
  }

  const copyGroupIDToClipboard = () => {
    if (!tab?.groupData?.id) return
    copyToClipboard(tab?.groupData?.id)
  }

  const copyUserDataToClipboard = () => {
    if (!tab?.userData) return
    copyToClipboard(JSON.stringify(tab?.userData, null, 4))
  }

  const copyGroupDataToClipboard = () => {
    if (!tab?.groupData) return
    copyToClipboard(JSON.stringify(tab?.groupData, null, 4))
  }

  return (
    <>
      <MenuItem onClick={closeTab}>Close</MenuItem>
      <MenuItem onClick={closeOtherTabs} disabled={windowsState[side].openedTabs?.length <= 1}>
        Close Others
      </MenuItem>
      <MenuItem onClick={closeAllTabs}>Close All</MenuItem>
      {/* <MenuItemSeparator />
      <MenuItem onClick={splitRight}>Split right</MenuItem>
      <MenuItem>Split left</MenuItem> */}
      {isConfigTab && (
        <>
          <MenuItemSeparator />
          <MenuItem onClick={copyCodeToClipboard}>Copy Code to clipboard</MenuItem>
          <MenuItem onClick={copyConfigToClipboard}>Copy Configuration to clipboard</MenuItem>
          <MenuItemSeparator />
          <MenuItem onClick={refreshTabContent}>Refresh</MenuItem>
        </>
      )}

      {isUserTab && (
        <>
          <MenuItemSeparator />
          <MenuItem onClick={copyUserIDToClipboard}>Copy user ID to clipboard</MenuItem>
          <MenuItem onClick={copyUserDataToClipboard}>Copy user data to clipboard</MenuItem>
        </>
      )}

      {isGroupTab && (
        <>
          <MenuItemSeparator />
          <MenuItem onClick={copyGroupIDToClipboard}>Copy group ID to clipboard</MenuItem>
          <MenuItem onClick={copyGroupDataToClipboard}>Copy group data to clipboard</MenuItem>
        </>
      )}
    </>
  )
})
