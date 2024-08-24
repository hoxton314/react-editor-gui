import { FC, useContext, useState } from 'react'
import { observer } from 'mobx-react'
import { createPermission } from '@communication/Permissions'
import { Select } from '@styles/generic.styles'
import { ResourceType, Operation } from '@customTypes/Permissions'
import { Form, Container, Title, Label } from './ModalTypes.styles'
import { ModalFooter } from '@components/Modal/Modal.styles'
import { SelectItem } from '@customTypes/General'
import { StoreContext } from '@components/App'
import { Modal } from '@/components/Modal/Modal'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { TextInput } from '@/components/TextInput'

export const AddPermissionModal: FC = observer(() => {
  const store = useContext(StoreContext)
  const { groupSelectList } = store.CommunicationState

  const [isLoading, setIsLoading] = useState(false)

  const [resourceType, setResourceType] = useState<ResourceType>('Config')
  const [resourceName, setResourceName] = useState('')
  const [operation, setOperation] = useState<Operation>('Read')
  const [allowedGroups, setAllowedGroups] = useState<SelectItem[]>([])

  const onSubmit = async () => {
    if (!resourceType || !resourceName || !operation || !allowedGroups) return

    const allowedGroupsIds = allowedGroups.map((group) => group.value)

    setIsLoading(true)

    await createPermission({ resourceType, resourceName, operation, allowedGroups: allowedGroupsIds })

    store.CommunicationState.fetchPermissionList()

    close()
    setIsLoading(false)
  }

  const close = () => {
    store.ModalState.closeModal('add-permission')
  }

  return (
    <Modal onClose={close}>
      {isLoading ? (
        <LoadingSpinner height="400px" thickness={4} />
      ) : (
        <Form>
          <Container>
            <Title> Create permission </Title>
            <Label> Resource Type </Label>
            <Select
              options={[
                { label: 'Config', value: 'Config' },
                { label: 'Secret', value: 'Secret' },
              ]}
              value={{ label: resourceType, value: resourceType }}
              onChange={(e: SelectItem) => setResourceType(e.value as ResourceType)}
            />

            <Label> Resource Name </Label>
            <TextInput
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              type="text"
              name="resourceName"
            />

            <Label> Operation </Label>
            <Select
              options={[
                { label: 'Read', value: 'Read' },
                { label: 'Write', value: 'Write' },
                { label: 'Delete', value: 'Delete' },
              ]}
              value={{ label: operation, value: operation }}
              onChange={(e: SelectItem) => setOperation(e.value as Operation)}
            />

            <Label> Allowed Groups </Label>
            <Select
              options={groupSelectList}
              value={allowedGroups}
              onChange={(e: SelectItem[]) => setAllowedGroups(e)}
              isMulti
            />
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
