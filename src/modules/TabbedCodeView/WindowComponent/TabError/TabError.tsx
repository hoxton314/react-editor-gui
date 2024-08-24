import { FC } from 'react'
import { styled } from 'styled-components'

const TabErrorContainer = styled.div`
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
`

const Icon = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors['activityBar.inactiveForeground']};
`

const Title = styled.h2``

const Description = styled.p``

interface TabErrorProps {
  endpoint: string
  resourceType: string
  errorMessage: string
}

export const TabError: FC<TabErrorProps> = ({ endpoint, resourceType, errorMessage }) => {
  return (
    <TabErrorContainer>
      <Icon>
        <svg viewBox="0 0 32 32" width="250px">
          <path
            fill="currentColor"
            d="m7 30h18a3 3 0 0 0 3-3v-22a3 3 0 0 0 -3-3h-11.17a3 3 0 0 0 -2.12.88l-6.83 6.83a3 3 0 0 0 -.88 2.12v15.17a3 3 0 0 0 3 3zm19-25v22a1 1 0 0 1 -1 1h-18a1 1 0 0 1 -1-1v-15h5a3 3 0 0 0 3-3v-5h11a1 1 0 0 1 1 1zm-14 .41v3.59a1 1 0 0 1 -1 1h-3.59z"
          />
          <path
            fill="currentColor"
            d="m14.63 13.88a1 1 0 0 0 -1.41 0l-.71.71-.71-.71a1 1 0 0 0 -1.41 1.41l.7.71-.7.71a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l.71-.71.71.71a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41l-.71-.71.71-.71a1 1 0 0 0 0-1.41z"
          />
          <path
            fill="currentColor"
            d="m17.37 18.12a1 1 0 0 0 1.41 0l.71-.71.71.71a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41l-.7-.71.7-.71a1 1 0 1 0 -1.41-1.41l-.71.71-.71-.71a1 1 0 0 0 -1.41 1.41l.71.71-.71.71a1 1 0 0 0 0 1.41z"
          />
          <path
            fill="currentColor"
            d="m10.59 22.41a1 1 0 0 0 1.32.5 9.6 9.6 0 0 1 8.18 0 1 1 0 0 0 .41.09 1 1 0 0 0 .41-1.91 11.63 11.63 0 0 0 -9.82 0 1 1 0 0 0 -.5 1.32z"
          />
        </svg>
      </Icon>

      <Title>
        {endpoint ? `Error on ${endpoint} ` : 'Something went wrong '}
        {resourceType && `when fetching ${resourceType} data`}
      </Title>

      <Description>{errorMessage || 'Something went wrong while trying to load tab.'}</Description>
    </TabErrorContainer>
  )
}
