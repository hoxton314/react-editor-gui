import { FC, useContext, useRef } from 'react'
import { useResizable } from 'react-resizable-layout'
import { ConfigurationViewWrapper } from './ConfigurationView.styles'
import { LeftSidebar } from './LeftSidebar/LeftSidebar'
import { RightSidebar } from '../RightSidebar/RightSidebar'
import { StoreContext } from '@components/App'
import { TabbedCodeView } from '../TabbedCodeView/TabbedCodeView'
import { observer } from 'mobx-react'

export const ConfigurationView: FC = observer(() => {
  const store = useContext(StoreContext)
  const { leftSidebarWidth, rightSidebarWidth, menuWidth } = store.UserInterfaceState.gridDimensions
  const { leftSidebar } = store.UserInterfaceState

  const containerRef = useRef<HTMLDivElement>(null)

  const {
    isDragging: isLeftSidebarDragging,
    position: computedLeftSidebarWidth,
    separatorProps: leftDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: leftSidebarWidth || 250,
    min: 150 + menuWidth,
    containerRef,
    onResizeEnd: (width) => store.UserInterfaceState.setLeftSidebarWidth(width.position - menuWidth),
  })

  const {
    isDragging: isRightSidebarDragging,
    position: computedRightSidebarWidth,
    separatorProps: rightDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: rightSidebarWidth || 250,
    min: 150,
    containerRef,
    reverse: true,
    onResizeEnd: (width) => store.UserInterfaceState.setRightSidebarWidth(width.position),
  })

  return (
    <ConfigurationViewWrapper
      $menuWidth={`${menuWidth}px`}
      $leftSidebarWidth={`${computedLeftSidebarWidth}px`}
      $rightSidebarWidth={`${computedRightSidebarWidth}px`}
      $isDragging={isLeftSidebarDragging || isRightSidebarDragging}
      ref={containerRef}
    >
      {leftSidebar?.isOpened && <LeftSidebar dragBarProps={leftDragBarProps} isResizing={isLeftSidebarDragging} />}

      <TabbedCodeView />

      <RightSidebar dragBarProps={rightDragBarProps} isResizing={isRightSidebarDragging} />
    </ConfigurationViewWrapper>
  )
})
