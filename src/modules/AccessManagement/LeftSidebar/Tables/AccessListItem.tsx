import { observer } from 'mobx-react'
import { FC, useCallback, useContext } from 'react'
import { StoreContext } from '@components/App'
import { StyledAccessListItem } from '../LeftSidebar.styles'
import { AccessManagementTabTypes } from '@store/CodeView.store'

interface AccessListItemProps {
  width: number
  onClick: (tabTitle: string) => void
  title: string
  type: AccessManagementTabTypes | ''
}

export const AccessListItem: FC<AccessListItemProps> = observer(({ width, onClick, title, type }) => {
  const store = useContext(StoreContext)
  const { windowsState, isHorizontalSplit } = store.CodeViewState

  const isTabForCurrentConfigNameAlreadyOpened = useCallback(() => {
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
  }, [windowsState, title, isHorizontalSplit])

  const isOpened = isTabForCurrentConfigNameAlreadyOpened()

  return (
    <StyledAccessListItem
      $active={isOpened}
      $width={width}
      onClick={() => {
        if (!isOpened) {
          onClick(title)
        }
      }}
      data-context-menu={`${type}-list-item`}
      data-context-menu-id={title}
    >
      {title}
    </StyledAccessListItem>
  )
})
