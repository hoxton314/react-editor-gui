import { FC, useContext, useState } from 'react'
import { Form, Container, Title, HighlightedText } from './ModalTypes.styles'
import { ModalFooter } from '@components/Modal/Modal.styles'
import { StoreContext } from '@components/App'
import { observer } from 'mobx-react'
import { Modal } from '@/components/Modal/Modal'
import { LoadingSpinner } from '@/components/LoadingSpinner'

export const ConfirmationModal: FC = observer(() => {
  const store = useContext(StoreContext)
  const { operation, highlightedText, onConfirm } = store.ModalState.confirmationModal

  const [isLoading, setIsLoading] = useState(false)

  const close = () => {
    store.ModalState.closeModal('confirmation')
    store.ModalState.setConfirmationModalData({
      operation: '',
      highlightedText: '',
      onConfirm: () => {},
    })
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    await onConfirm()
    setIsLoading(false)
    close()
  }

  return (
    <Modal onClose={close}>
      {isLoading ? (
        <LoadingSpinner height="254px" thickness={4} />
      ) : (
        <Form>
          <Container>
            <Title>
              Are you sure you want to {operation}
              {!!highlightedText && <HighlightedText>{' ' + highlightedText}</HighlightedText>}?
            </Title>
          </Container>

          <ModalFooter>
            <button onClick={close}> Cancel </button>
            <button onClick={handleConfirm}> Confirm </button>
          </ModalFooter>
        </Form>
      )}
    </Modal>
  )
})
