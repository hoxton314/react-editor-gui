import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { MinimizedToolboxContainer, ToolboxButton } from './Toolbox.styles'
import { HorizontalDotsIcon } from '@/components/Icons/HorizontalDotsIcon'
import { StoreContext } from '@/components/App'
import { Side } from '@/store/CodeView.store'
import { ShapesIcon } from '@/components/Icons/ShapesIcon'

interface MinimizedToolboxProps {
  side: Side
  shouldShowTabDropdown?: boolean
}

export const MinimizedToolbox: FC<MinimizedToolboxProps> = observer(({ side, shouldShowTabDropdown }) => {
  const store = useContext(StoreContext)

  const openDropdown = async (e, type) => {
    await new Promise((resolve) => setTimeout(resolve, 10))

    let parent = e.target as HTMLElement
    while (parent) {
      if (parent.getAttribute('data-context-menu')) {
        break
      }
      parent = parent.parentElement
    }

    store.UserInterfaceState.setContextMenuData({
      isVisible: true,
      type: type,
      style: 'dropdown',
      contextId: side,
      position: { x: e.clientX, y: e.clientY },
      parentBoundingRect: parent.getBoundingClientRect(),
    })
  }

  return (
    <MinimizedToolboxContainer
      className="ToolboxSmall"
      // always showing tab dropdown rn
      $isShowingTabDropdown={true || shouldShowTabDropdown}
    >
      {/* {shouldShowTabDropdown && ( */}
      <ToolboxButton
        title="Toolbox"
        onClick={(e) => openDropdown(e, 'toolbox-tab-dropdown')}
        data-context-menu="toolbox-tab-dropdown"
        data-context-menu-id={side}
      >
        <ShapesIcon />
      </ToolboxButton>
      {/* )} */}

      <ToolboxButton
        title="Toolbox"
        onClick={(e) => openDropdown(e, 'toolbox-action-dropdown')}
        data-context-menu="toolbox-action-dropdown"
        data-context-menu-id={side}
      >
        <HorizontalDotsIcon />
      </ToolboxButton>
    </MinimizedToolboxContainer>
  )
})
