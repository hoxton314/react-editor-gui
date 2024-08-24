import { FC, useContext, useState } from 'react'
import { addUser } from '@communication/Users'
import { Form, Container, Title, Label } from './ModalTypes.styles'
import { ModalFooter } from '@components/Modal/Modal.styles'
import { StoreContext } from '@components/App'
import { observer } from 'mobx-react'
import { Modal } from '@/components/Modal/Modal'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { TextInput } from '@/components/TextInput'

export const AddUserModal: FC = observer(() => {
  const store = useContext(StoreContext)

  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const onSubmit = async () => {
    if (!name || !email) return

    setIsLoading(true)
    await addUser({ name, email })

    setName('')
    setEmail('')

    store.CommunicationState.fetchUserList()
    store.CommunicationState.fetchUserSelectList()

    close()
    setIsLoading(false)
  }

  const close = () => {
    store.ModalState.closeModal('add-user')
  }

  return (
    <Modal onClose={close}>
      {isLoading ? (
        <LoadingSpinner height="254px" thickness={4} />
      ) : (
        <Form>
          <Container>
            <Title> Add User </Title>
            <Label> Name </Label>
            <TextInput
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              type="text"
              name="name"
            />
            <Label> Email </Label>
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" />
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
