import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { AddUserModal } from './ModalTypes/AddUserModal'
import { AddGroupModal } from './ModalTypes/AddGroupModal'
import { AddPermissionModal } from './ModalTypes/AddPermissionModal'
import { StoreContext } from '../App'
import { AddConfigurationModal } from './ModalTypes/AddConfigurationModal'
import { ConfirmationModal } from './ModalTypes/ConfirmationModal'
import { ModalName } from '@/store/Modal.store'

interface ModalTypeProps {
  type: ModalName
}

const ModalType: FC<ModalTypeProps> = observer(({ type }) => {
  switch (type) {
    case 'add-user':
      return <AddUserModal />
    case 'add-group':
      return <AddGroupModal />
    case 'add-permission':
      return <AddPermissionModal />
    case 'add-configuration':
      return <AddConfigurationModal />
    case 'confirmation':
      return <ConfirmationModal />
    default:
      return <></>
  }
})

export const ModalHandler: FC = observer(() => {
  const store = useContext(StoreContext)
  const { openedModals } = store.ModalState

  return openedModals.map((modal, v) => <ModalType key={modal + v} type={modal} />)
})
