import { FC, useContext, useEffect, useState } from 'react'
import { Side, Tab as TabInterface } from '@store/CodeView.store'
import { TabCloseButton, TabIconWrap, TabTitle, TabWrap } from './TabManager.styles'
import { observer } from 'mobx-react'
import { StoreContext } from '@components/App'
import { getTabIcon } from './getTabIcon'

interface TabProps {
  side: Side
}

export const Tab: FC<TabInterface & TabProps> = observer(({ id, title, type, side }) => {
  const store = useContext(StoreContext)
  const { windowsActiveTabs, currentlyFocusedWindow } = store.CodeViewState
  const { isDragging, draggedTabId, hoveringOverTabId } = store.CodeViewState.tabDragState

  const isActive = windowsActiveTabs[side]?.id === id
  const isFocused = isActive && currentlyFocusedWindow === side
  const isBeingDragged = isDragging && draggedTabId === id

  const [isSomethingDraggedOver, setIsSomethingDraggedOver] = useState(false)

  const onMouseDown = (e) => {
    if (e.button === 2) return
    store.CodeViewState.setActiveTab({ id, side })
    store.CodeViewState.setCurrentlyFocusedWindow(side)
  }

  const dragStart = () => {
    store.CodeViewState.setIsTabDragging(true)
    store.CodeViewState.setDraggedTabId(id)
    store.CodeViewState.setHoveringOverTabId('')

    return true
  }

  const dragEnd = () => {
    store.CodeViewState.setIsTabDragging(false)

    console.log('hoveringOverTabId', hoveringOverTabId)
    if (hoveringOverTabId?.length) {
      store.CodeViewState.handleTabDrop()
    }
  }

  const onDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSomethingDraggedOver(true)
    store.CodeViewState.setHoveringOverTabId(id)
  }

  const onDragLeave = (e) => {
    e.preventDefault()
    setIsSomethingDraggedOver(false)
    store.CodeViewState.setHoveringOverTabId('')
  }

  useEffect(() => {
    if (!hoveringOverTabId) {
      setIsSomethingDraggedOver(false)
    }
  }, [hoveringOverTabId])

  return (
    <TabWrap
      // flags
      $isActive={isActive}
      $isFocused={isFocused}
      $isBeingDragged={isBeingDragged}
      $isSomethingDraggedOver={isSomethingDraggedOver && isDragging && !isBeingDragged}
      // events
      onMouseDown={onMouseDown}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      // native html props
      role="tab"
      draggable={true}
      data-context-menu="tab"
      data-context-menu-id={id}
    >
      <TabIconWrap>{getTabIcon(type)}</TabIconWrap>
      <TabTitle>{title}</TabTitle>
      <TabCloseButton
        $isActive={isActive}
        onClick={(e) => {
          e.stopPropagation()
          store.CodeViewState.closeTab({ id })
        }}
      >
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
          <path
            d="M8.73436 0.265556C8.38006 -0.0885186 7.80592 -0.0885186 7.45173 0.265556L4.47835 3.23891L1.54827 0.308606C1.19408 -0.0454687 0.619942 -0.0454687 0.265638 0.308606C-0.0885459 0.662922 -0.0885459 1.23708 0.265638 1.59128L3.19572 4.52146L0.308686 7.4086C-0.0454974 7.76291 -0.0454974 8.33708 0.308686 8.69127C0.485838 8.86831 0.71789 8.95683 0.950062 8.95683C1.18211 8.95683 1.41429 8.86831 1.59144 8.69127L4.47835 5.80426L7.40844 8.73444C7.58559 8.91148 7.81764 9 8.04982 9C8.28187 9 8.51404 8.91148 8.69119 8.73444C9.04538 8.38013 9.04538 7.80596 8.69119 7.45177L5.76111 4.52158L8.73436 1.54823C9.08855 1.19391 9.08855 0.619751 8.73436 0.265556Z"
            fill="currentColor"
          />
        </svg>
      </TabCloseButton>
    </TabWrap>
  )
})
