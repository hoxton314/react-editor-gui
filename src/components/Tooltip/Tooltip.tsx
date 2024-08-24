import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { TooltipArrow, TooltipContainer } from './Tooltip.styles'
import { StoreContext } from '../App'
import { rootStore } from '@/store/Root.store'
import { createPortal } from 'react-dom'

const TIMEOUT = 300

export const handleTooltip = (e, displayText: string, offset?: number) => {
  rootStore.UserInterfaceState.setTooltipTimeout(
    setTimeout(() => {
      showTooltip(e, displayText, offset)
    }, TIMEOUT),
  )
}

export const showTooltip = (e, displayText: string, offset: number) => {
  const boundingRect = e.target.getBoundingClientRect()

  rootStore.UserInterfaceState.setTooltipData({
    displayText,
    isVisible: true,
    boundingRect,
    offset: offset || 0,
  })
}

export const closeTooltip = () => {
  rootStore.UserInterfaceState.hideTooltip()
  rootStore.UserInterfaceState.clearTooltipTimeout()
}

export const Tooltip: FC = observer(() => {
  const store = useContext(StoreContext)
  const { displayText, isVisible, boundingRect, offset } = store.UserInterfaceState.tooltip

  return createPortal(
    <TooltipContainer $isVisible={isVisible} $boundingRect={boundingRect} $offset={offset}>
      <TooltipArrow $direction="left" />
      {displayText}
    </TooltipContainer>,
    document.body,
  )
})
