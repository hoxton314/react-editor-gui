import { observer } from 'mobx-react'
import { FC, useContext, useEffect, useState } from 'react'
import { Side, Tab } from '@store/CodeView.store'
import { StoreContext } from '@components/App'
import {
  TabTitle,
  AccessManagementTabsContainer,
  Value,
  ValueTitle,
  VerticalList,
  VerticalListItem,
  VerticalListFlexWrapContainer,
  VerticalListBordered,
} from './WindowTypes.styles'
import { getGroup } from '@communication/Groups'
import { ContentLoader } from '../../TabbedCodeView.styles'
import { LifecycleState } from '@customTypes/General'
import { GroupUserObject } from '@customTypes/Group'
import { Spacer } from '@/styles/generic.styles'
import { encodeString } from '@/methods/encode'
import { TabError } from '../TabError/TabError'

interface GroupDetailsWindowProps {
  side: Side
}

const UserData: FC<{ user: GroupUserObject }> = ({ user }) => {
  return (
    <VerticalListBordered
      key={user.userId}
      // Right now we cant get user email for single user to be able to open this tab with full data
      // onClick={ ()=> store.CodeViewState.addTab({
      //   tab: {
      //     title: user.name,
      //     type: 'user',
      //     userData: user,
      //   },
      //   side: currentlyFocusedWindow,
      // })}
    >
      <VerticalListItem>
        <ValueTitle>ID:</ValueTitle>
        <Value>{user?.userId}</Value>
      </VerticalListItem>
      <VerticalListItem>
        <ValueTitle>Name:</ValueTitle>
        <Value>{user?.name}</Value>
      </VerticalListItem>
      <VerticalListItem>
        <ValueTitle>Deleted:</ValueTitle>
        <Value>{user?.isDeleted ? 'yes' : 'no'}</Value>
      </VerticalListItem>
    </VerticalListBordered>
  )
}

export const GroupDetailsWindow: FC<GroupDetailsWindowProps> = observer(({ side }) => {
  const store = useContext(StoreContext)
  const { windowsActiveTabs } = store.CodeViewState
  const tabData = windowsActiveTabs[side] as Tab

  const [lifecycleState, setLifecycleState] = useState<LifecycleState>('init')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const initTabData = async () => {
    setLifecycleState('fetching')
    const res = await getGroup(tabData.groupData.id)

    if (res?.success) {
      store.CodeViewState.setTabPropertyValue({
        tabId: tabData.id,
        property: 'groupData',
        value: res.data,
      })
      setLifecycleState('fetched')
    } else {
      setErrorMessage(res?.error?.message || 'Failed to fetch entity')
      setLifecycleState('error')
    }
  }

  useEffect(() => {
    if (tabData?.groupData?.members) {
      setLifecycleState('fetched')
    } else if (tabData?.groupData?.id) {
      initTabData()
    } else {
      setErrorMessage('Group ID not found')
      setLifecycleState('error')
    }
  }, [tabData?.groupData?.id, tabData?.groupData?.members])

  switch (lifecycleState) {
    case 'init':
      return <></>
    case 'fetching':
      return <ContentLoader type="code" />
    case 'fetched':
      return (
        <AccessManagementTabsContainer>
          <TabTitle>Group {tabData?.groupData?.name}</TabTitle>

          <Spacer size={20} />

          <VerticalList>
            {!!tabData?.groupData?.id && (
              <VerticalListItem>
                <ValueTitle>ID:</ValueTitle>
                <Value>{tabData?.groupData?.id}</Value>
              </VerticalListItem>
            )}

            {!!tabData?.groupData?.name && (
              <VerticalListItem>
                <ValueTitle>Name:</ValueTitle>
                <Value>{tabData?.groupData?.name}</Value>
              </VerticalListItem>
            )}

            {!!tabData?.groupData?.members?.length && (
              <VerticalListItem>
                <ValueTitle>Members:</ValueTitle>
                <Spacer size={10} />
                <VerticalListFlexWrapContainer>
                  {tabData?.groupData?.members.map((member) => <UserData key={member.userId} user={member} />)}
                </VerticalListFlexWrapContainer>
              </VerticalListItem>
            )}
          </VerticalList>

          <Spacer size={64} />
        </AccessManagementTabsContainer>
      )
    case 'error':
      return (
        <TabError
          endpoint={`/groups/${encodeString(tabData?.groupData?.id)}`}
          resourceType={'group'}
          errorMessage={errorMessage}
        />
      )
  }
})
