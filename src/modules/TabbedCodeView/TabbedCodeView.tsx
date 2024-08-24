import { FC, useContext, useEffect, useRef } from 'react'
import { useResizable } from 'react-resizable-layout'
import { observer } from 'mobx-react'
import { TabbedCodeViewWrapper } from './TabbedCodeView.styles'
import { StoreContext } from '@components/App'
import { WindowComponent } from './WindowComponent/WindowComponent'
import { TabManager } from './TabManager/TabManager'

export const TabbedCodeView: FC = observer(() => {
  const store = useContext(StoreContext)
  const { horizontalWidth, isHorizontalSplit } = store.CodeViewState
  const { leftSidebar, isRightSidebarVisible } = store.UserInterfaceState

  const containerRef = useRef<HTMLDivElement>(null)

  const {
    isDragging: isHorizontalDragging,
    position: computedHorizontalWidth,
    separatorProps: horizontalDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: horizontalWidth,
    min: 50,
    containerRef,
    onResizeEnd: (width) => store.CodeViewState.setHorizontalWidth(width.position),
  })

  useEffect(() => {
    if (!containerRef.current) return
    const resizeObserver = new ResizeObserver(() => {
      store.CodeViewState.setContainerWidth(containerRef?.current?.offsetWidth || 0)
    })
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <TabbedCodeViewWrapper
      $isDragging={isHorizontalDragging}
      $horizontalWidth={`${computedHorizontalWidth}px`}
      ref={containerRef}
      $isLeftSidebarOpened={leftSidebar.isOpened}
      $isRightSidebarOpened={isRightSidebarVisible}
    >
      <TabManager leftWidth={computedHorizontalWidth} />

      {isHorizontalSplit && (
        <WindowComponent
          horizontalDragBarProps={horizontalDragBarProps}
          isHorizontalDragging={isHorizontalDragging}
          horizontalPosition="left"
        />
      )}
      <WindowComponent horizontalPosition="right" />
    </TabbedCodeViewWrapper>
  )
})
