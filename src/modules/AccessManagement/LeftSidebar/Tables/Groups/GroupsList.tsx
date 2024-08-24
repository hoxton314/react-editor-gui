import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { StoreContext } from '@components/App'
import { AccessList, StyledAccessListHeader } from '../../LeftSidebar.styles'
import { GroupRow } from './GroupRow'

export const GroupsList: FC = observer(() => {
  const store = useContext(StoreContext)
  const { groupsList } = store.CommunicationState

  return (
    <AccessList $colCount={1}>
      <StyledAccessListHeader>Name</StyledAccessListHeader>
      {groupsList.map((group) => (
        <GroupRow group={group} key={group.id + 'name'} />
      ))}
    </AccessList>
  )
})
