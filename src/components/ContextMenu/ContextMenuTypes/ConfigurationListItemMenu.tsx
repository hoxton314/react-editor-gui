import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { MenuItem, MenuItemSeparator } from '../ContextMenu.styles'
import { StoreContext } from '../../App'
import { copyToClipboard } from '@/methods/copyToClipboard'

export const ConfigurationListItemMenu: FC = observer(() => {
  const store = useContext(StoreContext)
  const { contextMenu } = store.UserInterfaceState
  const { currentlyFocusedWindow } = store.CodeViewState

  const openTab = () => {
    store.CodeViewState.addTab({
      tab: {
        title: contextMenu.contextId,
        type: 'configuration',
        configurationId: contextMenu.contextId,
      },
      side: currentlyFocusedWindow,
    })
  }

  const copyName = () => {
    if (contextMenu?.contextId) {
      copyToClipboard(contextMenu.contextId)
    }
  }

  return (
    <>
      <MenuItem onClick={openTab}>Open</MenuItem>
      <MenuItemSeparator />
      <MenuItem onClick={copyName}>Copy name</MenuItem>
    </>
  )
})
