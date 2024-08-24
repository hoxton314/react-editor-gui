import { Side, TabId } from '@store/CodeView.store'
import { RootStore } from '@store/Root.store'

export const getSideBasedOnIdOrSide = (TabIdOrSide: TabId | Side, store: RootStore) => {
  if (TabIdOrSide === 'left' || TabIdOrSide === 'right') {
    return TabIdOrSide
  }

  const { windowsState } = store.CodeViewState

  if (windowsState.left.openedTabs.includes(TabIdOrSide)) {
    return 'left'
  }

  if (windowsState.right.openedTabs.includes(TabIdOrSide)) {
    return 'right'
  }

  return null
}
