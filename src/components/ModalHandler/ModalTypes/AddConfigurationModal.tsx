import { FC, useCallback, useContext, useState } from 'react'
import { Select, Spacer } from '@styles/generic.styles'
import { Form, Container, Title, Label, JSONEditorWrapper } from './ModalTypes.styles'
import { ModalFooter } from '@components/Modal/Modal.styles'
import { observer } from 'mobx-react'
import { StoreContext } from '@components/App'
import { SelectItem } from '@customTypes/General'
import { Modal } from '@/components/Modal/Modal'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { createConfiguration } from '@/communication/Configurations'
import { JSONEditor } from '@/components/JSONEditor/JSONEditor'

const configDefaultBody = {
  responseType: 'plain',
  encryptionKid: '',
  resultWebhookUrls: [],
  enableAccessCode: false,
  'certs-ref-secret': '',
  services: {},
  configurationId: '',
  type: 'Client',
}

export const AddConfigurationModal: FC = observer(() => {
  const store = useContext(StoreContext)
  const { groupSelectList } = store.CommunicationState

  const [isLoading, setIsLoading] = useState(false)

  const [configurationJson, setConfigurationJson] = useState(JSON.stringify(configDefaultBody, null, 4))
  const [allowedGroups, setAllowedGroups] = useState<SelectItem[]>([])

  const onSubmit = async () => {
    const selectedGroupsIds = allowedGroups.map((group) => group.value)

    setIsLoading(true)

    const res = await createConfiguration(JSON.parse(configurationJson), selectedGroupsIds)

    if (res?.success) {
      close()
      store.CommunicationState.fetchConfigurationLists()
    }

    setIsLoading(false)
  }

  const [shouldShowBorder, setShouldShowBorder] = useState(false)

  const disableJSONBorder = useCallback(() => {
    setShouldShowBorder(false)
  }, [])

  const close = () => {
    store.ModalState.closeModal('add-configuration')
  }

  return (
    <Modal onClose={close} width="800px">
      {isLoading ? (
        <LoadingSpinner height="300px" thickness={4} />
      ) : (
        <Form onClick={disableJSONBorder}>
          <Container>
            <Title> Create Configuration </Title>

            <Spacer size={20} />

            <JSONEditorWrapper
              $showBorder={shouldShowBorder}
              onClick={(e) => {
                e.stopPropagation()
                setShouldShowBorder(true)
              }}
            >
              <JSONEditor
                value={configurationJson}
                onChange={(e, val) => {
                  if (val) {
                    setConfigurationJson(val)
                  }
                }}
                height="600px"
              />
            </JSONEditorWrapper>

            <Label> Allowed Groups </Label>
            <Select
              options={groupSelectList}
              value={allowedGroups}
              onChange={(e: SelectItem[]) => setAllowedGroups(e)}
              isMulti
            />
          </Container>

          <ModalFooter>
            <button onClick={close}>Cancel</button>
            <button onClick={onSubmit}> Create </button>
          </ModalFooter>
        </Form>
      )}
    </Modal>
  )
})
