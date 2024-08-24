import { FC, useContext, useState } from 'react'
import { addGroup } from '@communication/Groups'
import { Select } from '@styles/generic.styles'
import { Form, Container, Title, Label } from './ModalTypes.styles'
import { ModalFooter } from '@components/Modal/Modal.styles'
import { observer } from 'mobx-react'
import { StoreContext } from '@components/App'
import { SelectItem } from '@customTypes/General'
import { Modal } from '@/components/Modal/Modal'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { TextInput } from '@/components/TextInput'

export const AddGroupModal: FC = observer(() => {
  const store = useContext(StoreContext)
  const { userSelectList } = store.CommunicationState

  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [groupMembers, setGroupMembers] = useState<SelectItem[]>([])

  const onSubmit = async () => {
    if (!name || !groupMembers) return
    const members = groupMembers.map((member) => member.value)

    setIsLoading(true)

    await addGroup({ name, members })

    store.CommunicationState.fetchGroupList()
    store.CommunicationState.fetchGroupSelectList()

    close()
    setIsLoading(false)
  }

  const close = () => {
    store.ModalState.closeModal('add-group')
  }

  return (
    <Modal onClose={close}>
      {isLoading ? (
        <LoadingSpinner height="300px" thickness={4} />
      ) : (
        <Form>
          <Container>
            <Title> Add Group </Title>
            <Label> Name </Label>
            <TextInput value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" />
            <Label> Members</Label>
            <Select options={userSelectList} isMulti value={groupMembers} onChange={setGroupMembers} />
          </Container>

          <ModalFooter>
            <button onClick={close}> Cancel </button>
            <button onClick={onSubmit}> Create </button>
          </ModalFooter>
        </Form>
      )}
    </Modal>
  )
})
