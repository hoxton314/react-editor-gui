import { observer } from 'mobx-react'
import { FC, useCallback, useContext } from 'react'
import { StoreContext } from '@components/App'
import { StyledConfigurationListItem } from './LeftSidebar.styles'
import { Side } from '@/store/CodeView.store'

interface ConfigurationListItemProps {
  width: number
  title: string
}

export const ConfigurationListItem: FC<ConfigurationListItemProps> = observer(({ width, title }) => {
  const store = useContext(StoreContext)
  const { windowsState, isHorizontalSplit, currentlyFocusedWindow } = store.CodeViewState

  const isTabForCurrentConfigNameAlreadyOpened = () => {
    for (const key in windowsState.tabs) {
      if (windowsState.tabs[key].title === title) {
        // not showing active state when opened tab is in hidden window
        if (!isHorizontalSplit && windowsState['left'].openedTabs.includes(windowsState.tabs[key].id)) {
          return false
        }

        return true
      }
    }

    return false
  }

  const isOpened = useCallback(() => {
    return isTabForCurrentConfigNameAlreadyOpened()
  }, [windowsState, title, isHorizontalSplit])

  const isCurrentlyViewing =
    store.CodeViewState.windowsActiveTabs[store.CodeViewState.currentlyFocusedWindow]?.title === title

  const handleOpeningTab = (tabConfigId: string) => {
    store.CodeViewState.addTab({
      tab: {
        title: tabConfigId,
        type: 'configuration',
        configurationId: tabConfigId,
      },
      side: currentlyFocusedWindow,
    })
  }

  const switchToTab = (tabConfigId: string) => {
    let tabId = windowsState.left.openedTabs.find((tabId) => windowsState.tabs[tabId].title === tabConfigId)
    let side: Side = 'left'

    if (!tabId) {
      tabId = windowsState.right.openedTabs.find((tabId) => windowsState.tabs[tabId].title === tabConfigId)
      side = 'right'
    }

    if (!tabId) {
      handleOpeningTab(tabConfigId)
    } else {
      store.CodeViewState.setActiveTab({ id: tabId, side })
    }
  }

  return (
    <StyledConfigurationListItem
      $active={isOpened()}
      $width={width}
      $isCurrentlyViewing={isCurrentlyViewing}
      onClick={() => {
        if (!isOpened()) {
          handleOpeningTab(title)
        } else {
          switchToTab(title)
        }
      }}
      data-context-menu={`configuration-list-item`}
      data-context-menu-id={title}
    >
      {title}
    </StyledConfigurationListItem>
  )
})
