import { FC, useContext } from 'react'
import { observer } from 'mobx-react'
import { TabManagerContainer } from './TabManager.styles'
import { StoreContext } from '@components/App'
import { TabColumn } from './TabColumn'

interface TabManagerProps {
  leftWidth?: number
}

export const TabManager: FC<TabManagerProps> = observer(({ leftWidth }) => {
  const store = useContext(StoreContext)
  const { isHorizontalSplit, containerWidth } = store.CodeViewState

  return (
    <TabManagerContainer
      className="TabManager"
      $isSplit={isHorizontalSplit}
      $leftWidth={`${leftWidth}px`}
      $rightWidth={`calc(${containerWidth}px - ${leftWidth}px)`}
    >
      {isHorizontalSplit && <TabColumn side="left" />}
      <TabColumn side="right" />
    </TabManagerContainer>
  )
})
