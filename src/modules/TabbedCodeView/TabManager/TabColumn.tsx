import { observer } from 'mobx-react'
import { FC, useCallback, useContext, useState } from 'react'
import { TabManagerColumn, TabsContainer } from './TabManager.styles'
import { StoreContext } from '@/components/App'
import { Toolbox } from './Toolbox/Toolbox'
import { Tab } from './Tab'
import { MinimizedToolbox } from './Toolbox/MinimizedToolbox'
import { Side } from '@/store/CodeView.store'

interface TabColumnProps {
  side: Side
}

export const TabColumn: FC<TabColumnProps> = observer(({ side }) => {
  const store = useContext(StoreContext)
  const { windowsState, tabDragState, currentlyFocusedWindow } = store.CodeViewState

  const getTabs = (side) => {
    return windowsState[side].openedTabs.map((tabId) => {
      return <Tab key={tabId} {...windowsState.tabs[tabId]} side={side} />
    })
  }

  // Drag logic
  const [isSomethingDraggedOver, setIsSomethingDraggedOver] = useState(false)

  const onDragOver = (e, side) => {
    e.preventDefault()
    e.stopPropagation()

    setIsSomethingDraggedOver(true)

    store.CodeViewState.setHoveringOverTabId(side)
  }

  const onDragLeave = (e) => {
    e.preventDefault()
    setIsSomethingDraggedOver(false)
    store.CodeViewState.setHoveringOverTabId('')
  }

  // Overflow detection logic
  const [isOverflowing, setIsOverflowing] = useState(false)
  // detect when minimized toolbox should be shown to determine if tab dropdown should be shown
  const [areTabsOverflowing, setAreTabsOverflowing] = useState(false)

  const tabManagerColumnRef = useCallback((node) => {
    if (!node) return
    const resizeObserver = new ResizeObserver(() => {
      let tabSumWidth = 0
      node.childNodes[0].childNodes.forEach((child) => {
        tabSumWidth += child.offsetWidth
      })

      if (tabSumWidth + node.childNodes[1]?.offsetWidth > node.offsetWidth - 10) {
        setIsOverflowing(true)
      } else {
        setIsOverflowing(false)
      }

      // 50 is current minimized toolbox width without tab dropdown
      if (tabSumWidth + 50 > node.offsetWidth - 10) {
        setAreTabsOverflowing(true)
      } else {
        setAreTabsOverflowing(false)
      }
    })
    resizeObserver.observe(node)
  }, [])

  const shouldShowMinimizedToolbox = isOverflowing || currentlyFocusedWindow !== side

  return (
    <TabManagerColumn
      className="TabManagerColumn"
      ref={tabManagerColumnRef}
      $isBeingDraggedOver={isSomethingDraggedOver && !!tabDragState?.draggedTabId}
      $isEmpty={!windowsState.left.openedTabs.length}
      onDragOver={(e) => onDragOver(e, side)}
      onDragLeave={onDragLeave}
    >
      <TabsContainer className="TabContainer">{getTabs(side)}</TabsContainer>
      {currentlyFocusedWindow === side && <Toolbox isTransparent={isOverflowing} side={side} />}
      {shouldShowMinimizedToolbox && <MinimizedToolbox side={side} shouldShowTabDropdown={areTabsOverflowing} />}
    </TabManagerColumn>
  )
})
