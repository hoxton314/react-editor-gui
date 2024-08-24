import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { MenuItem } from '../ContextMenu.styles'
import { StoreContext } from '../../App'

interface ToolboxAddButtonMenuProps {}

export const ToolboxAddButtonMenu: FC<ToolboxAddButtonMenuProps> = observer(() => {
  const store = useContext(StoreContext)

  return (
    <>
      <MenuItem onClick={() => store.ModalState.openModal('add-configuration')}>Create configuration</MenuItem>
      <MenuItem onClick={() => store.ModalState.openModal('add-user')}>Add user</MenuItem>
      <MenuItem onClick={() => store.ModalState.openModal('add-group')}>Add group</MenuItem>
      <MenuItem onClick={() => store.ModalState.openModal('add-permission')}>Add permission</MenuItem>
    </>
  )
})
