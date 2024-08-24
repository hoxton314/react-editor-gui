import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { StoreContext } from '@components/App'
import { AccessList, StyledAccessListHeader } from '../../LeftSidebar.styles'
import { UserRow } from './UserRow'

export const UsersList: FC = observer(() => {
  const store = useContext(StoreContext)
  const { usersList } = store.CommunicationState

  return (
    <AccessList $colCount={2}>
      <StyledAccessListHeader>Name</StyledAccessListHeader>
      <StyledAccessListHeader>E-mail</StyledAccessListHeader>
      {usersList.map((user, index) => (
        <UserRow key={index} user={user} />
      ))}
    </AccessList>
  )
})
