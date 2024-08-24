import { observer } from 'mobx-react'
import { FC, useCallback, useContext, useMemo, useState } from 'react'
import { StoreContext } from '@components/App'
import { DeleteButton, StyledAccessListItem } from '../../LeftSidebar.styles'
import { User } from '@customTypes/User'
import { DeleteIcon } from '@/components/Icons/DeleteIcon'
import { deleteUser } from '@/communication/Users'
import { Side, TabList } from '@store/CodeView.store'

// #TODO: reimplement hover logic to prevent full rerender on each mouse enter/leave event
const isUserTabAlreadyOpened = (tabList: TabList, userId: string) => {
  return Object.values(tabList).some((tab) => tab.userData?.id === userId)
}

export const UserRow: FC<{ user: User }> = observer(({ user }) => {
  const store = useContext(StoreContext)
  const { currentlyFocusedWindow, windowsState } = store.CodeViewState

  const [isHovering, setIsHovering] = useState(false)

  const isActive = isUserTabAlreadyOpened(store.CodeViewState.windowsState.tabs, user.id)
  const isCurrentlyViewing =
    store.CodeViewState.windowsActiveTabs[store.CodeViewState.currentlyFocusedWindow]?.userData?.id === user.id

  const handleOpeningTab = (user: User) => {
    store.CodeViewState.addTab({
      tab: {
        title: user.name,
        type: 'user',
        userData: user,
      },
      side: currentlyFocusedWindow,
    })
  }

  const switchToTab = (user: User) => {
    let tabId = windowsState.left.openedTabs.find((tabId) => windowsState.tabs[tabId].title === user.name)
    let side: Side = 'left'

    if (!tabId) {
      tabId = windowsState.right.openedTabs.find((tabId) => windowsState.tabs[tabId].title === user.name)
      side = 'right'
    }

    if (!tabId) {
      handleOpeningTab(user)
    } else {
      store.CodeViewState.setActiveTab({ id: tabId, side })
    }
  }

  const handleModalConfirmation = (e) => {
    e.stopPropagation()
    store.ModalState.setConfirmationModalData({
      operation: 'delete',
      highlightedText: user.name,
      onConfirm: async () => await deleteUser(user?.id),
    })

    store.ModalState.openModal('confirmation')
  }

  const handleClick = useCallback(() => {
    if (isActive) {
      switchToTab(user)
    } else {
      handleOpeningTab(user)
    }
  }, [user, isActive, currentlyFocusedWindow])

  const itemProps = useMemo(() => {
    return {
      onClick: handleClick,
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => setIsHovering(false),
      'data-context-menu': `user-list-item`,
      'data-context-menu-id': user?.id,
      $isHovering: isHovering,
      $isCurrentlyViewing: isCurrentlyViewing,
      $active: isActive,
    }
  }, [user, isHovering, isCurrentlyViewing, isActive])

  return [
    <StyledAccessListItem key={user.id + 'name'} data-context-menu-property={'name'} {...itemProps}>
      <span>{user?.name}</span>
    </StyledAccessListItem>,
    <StyledAccessListItem key={user.id + 'email'} data-context-menu-property={'email'} {...itemProps}>
      <span>{user?.email}</span>
      <DeleteButton $visible={isHovering} onClick={handleModalConfirmation}>
        <DeleteIcon size={16} />
      </DeleteButton>
    </StyledAccessListItem>,
  ]
})
