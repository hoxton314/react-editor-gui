import { observer } from 'mobx-react'
import { FC, useCallback, useContext, useState } from 'react'
import { StoreContext } from '@components/App'
import { DeleteButton, StyledAccessListItem } from '../../LeftSidebar.styles'
import { GroupListItem } from '@customTypes/Group'
import { Side, TabList } from '@store/CodeView.store'
import { DeleteIcon } from '@/components/Icons/DeleteIcon'
import { deleteGroup } from '@/communication/Groups'

const isGroupTabAlreadyOpened = (tabList: TabList, groupId: string) => {
  return Object.values(tabList).some((tab) => tab.groupData?.id === groupId)
}

export const GroupRow: FC<{ group: GroupListItem }> = observer(({ group }) => {
  const store = useContext(StoreContext)
  const { currentlyFocusedWindow, windowsState } = store.CodeViewState

  const [isHovering, setIsHovering] = useState(false)

  const isActive = isGroupTabAlreadyOpened(store.CodeViewState.windowsState.tabs, group.id)
  const isCurrentlyViewing =
    store.CodeViewState.windowsActiveTabs[store.CodeViewState.currentlyFocusedWindow]?.groupData?.id === group.id

  const handleOpeningTab = (group: GroupListItem) => {
    store.CodeViewState.addTab({
      tab: {
        title: group.name,
        type: 'group',
        groupData: group,
      },
      side: currentlyFocusedWindow,
    })
  }

  const switchToTab = (group: GroupListItem) => {
    if (!group?.id) {
      return
    }

    let tabId = windowsState.left.openedTabs.find((tabId) => windowsState.tabs[tabId].groupData?.id === group.id)
    let side: Side = 'left'

    if (!tabId) {
      tabId = windowsState.right.openedTabs.find((tabId) => windowsState.tabs[tabId].groupData?.id === group.id)
      side = 'right'
    }

    if (!tabId) {
      handleOpeningTab(group)
    } else {
      store.CodeViewState.setActiveTab({ id: tabId, side })
    }
  }

  const handleModalConfirmation = (e) => {
    e.stopPropagation()
    store.ModalState.setConfirmationModalData({
      operation: 'delete',
      highlightedText: group.name,
      onConfirm: async () => await deleteGroup(group.id),
    })

    store.ModalState.openModal('confirmation')
  }

  const handleClick = useCallback(() => {
    if (isActive) {
      switchToTab(group)
    } else {
      handleOpeningTab(group)
    }
  }, [group, isActive, currentlyFocusedWindow])

  return (
    <StyledAccessListItem
      $active={isActive}
      $isCurrentlyViewing={isCurrentlyViewing}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-context-menu={`group-list-item`}
      data-context-menu-id={group?.id}
    >
      <span>{group?.name}</span>
      <DeleteButton $visible={isHovering} onClick={handleModalConfirmation}>
        <DeleteIcon size={16} />
      </DeleteButton>
    </StyledAccessListItem>
  )
})
