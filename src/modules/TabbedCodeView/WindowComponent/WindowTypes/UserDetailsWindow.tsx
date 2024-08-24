import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { Side, Tab } from '@store/CodeView.store'
import { StoreContext } from '@components/App'
import {
  AccessManagementTabsContainer,
  TabTitle,
  Value,
  ValueTitle,
  VerticalList,
  VerticalListItem,
} from './WindowTypes.styles'
import { Spacer } from '@/styles/generic.styles'

interface UserDetailsWindowProps {
  side: Side
}

export const UserDetailsWindow: FC<UserDetailsWindowProps> = observer(({ side }) => {
  const store = useContext(StoreContext)
  const { windowsActiveTabs } = store.CodeViewState
  const tabData = windowsActiveTabs[side] as Tab

  return (
    <AccessManagementTabsContainer>
      <TabTitle>User {tabData?.userData?.name}</TabTitle>

      <Spacer size={20} />

      <VerticalList>
        <VerticalListItem>
          <ValueTitle>ID:</ValueTitle>
          <Value>{tabData?.userData?.id}</Value>
        </VerticalListItem>
        <VerticalListItem>
          <ValueTitle>Name:</ValueTitle>
          <Value>{tabData?.userData?.name}</Value>
        </VerticalListItem>
        <VerticalListItem>
          <ValueTitle>E-mail:</ValueTitle>
          <Value>{tabData?.userData?.email}</Value>
        </VerticalListItem>
        {tabData?.userData?.entraUserId && (
          <VerticalListItem>
            <ValueTitle>Entra User ID:</ValueTitle>
            <Value>{tabData?.userData?.entraUserId}</Value>
          </VerticalListItem>
        )}
      </VerticalList>

      <Spacer size={64} />
    </AccessManagementTabsContainer>
  )
})
