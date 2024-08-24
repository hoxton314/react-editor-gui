import { observer } from 'mobx-react'
import { toast } from 'react-toastify'
import { FC, useCallback, useEffect, useState } from 'react'
import { getOnCalls, postCreateIncident, GetOnCallsResponse } from '@communication/Ops'
import { Container, Form, PeopleOnCallContainer, PeopleOnCallRow, PeopleOnCallTitle } from './CreateIncident.styles'
import { ToolButton, ToolTitle } from '../../Tools.styles'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Select } from '@/styles/generic.styles'
import { TextInput } from '@/components/TextInput'
import { SelectItem } from '@/types/General'
import { TextAreaInput } from '@/components/TextAreaInput'

type Priority = 'P1' | 'P2' | 'P3' | 'P4' | 'P5'

const selectOptions = [
  { label: 'P1', value: 'P1' },
  { label: 'P2', value: 'P2' },
  { label: 'P3', value: 'P3' },
  { label: 'P4', value: 'P4' },
  { label: 'P5', value: 'P5' },
]

export const CreateIncident: FC = observer(() => {
  const [isLoading, setIsLoading] = useState(false)
  const [onCalls, setOnCalls] = useState<GetOnCallsResponse[]>([])

  const [message, setMessage] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('P1')

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      if (isLoading || !message || !description) return

      setIsLoading(true)

      await postCreateIncident({
        message,
        description,
        priority,
      })

      setMessage('')
      setDescription('')
      setPriority('P1')

      toast.success('Incident created successfully')

      setIsLoading(false)
    },
    [message, description, priority],
  )

  const getDataOfOnCallPeople = async () => {
    const onCallsData = await getOnCalls()
    setOnCalls(onCallsData)
  }

  useEffect(() => {
    void getDataOfOnCallPeople()
  }, [])

  return (
    <>
      <ToolTitle>Create Incident</ToolTitle>
      <Container>
        {!!onCalls?.length && (
          <PeopleOnCallContainer>
            <PeopleOnCallTitle>People on call</PeopleOnCallTitle>

            {onCalls?.map((onCall, index) => (
              <PeopleOnCallRow key={index}>
                <div>{onCall.schedule}</div>

                {onCall?.participants?.map((participant, index) => <div key={index}>{participant}</div>)}
              </PeopleOnCallRow>
            ))}
          </PeopleOnCallContainer>
        )}

        <Form onSubmit={handleSubmit}>
          <label>Message</label>
          <TextInput
            onChange={(e) => {
              setMessage(e.target.value)
            }}
            value={message}
            height="40px"
            type="text"
            onError={() => {}}
            disabled={isLoading}
          />

          <label>Description</label>
          <TextAreaInput
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            autoComplete="off"
            disabled={isLoading}
          />
          <label>Priority</label>

          <Select
            name="priority"
            onChange={(e: SelectItem) => {
              setPriority(e.value as Priority)
            }}
            options={selectOptions}
            isDisabled={isLoading}
          />

          <ToolButton>{isLoading ? <LoadingSpinner width="20px" thickness={3} /> : 'Create'}</ToolButton>
        </Form>
      </Container>
    </>
  )
})
