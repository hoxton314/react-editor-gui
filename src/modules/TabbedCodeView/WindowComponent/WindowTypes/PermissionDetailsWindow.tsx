import { observer } from 'mobx-react'
import { FC, useContext, useEffect, useState } from 'react'
import { Side, Tab } from '@store/CodeView.store'
import { StoreContext } from '@components/App'
import ContentLoader from 'react-content-loader'
import { listPermissionsForResource } from '@communication/Permissions'
import { LifecycleState } from '@customTypes/General'
import { GroupListItem } from '@customTypes/Group'
import {
  AccessManagementTabsContainer,
  TabTitle,
  Value,
  ValueTitle,
  VerticalList,
  VerticalListFlexWrapContainer,
  VerticalListItem,
  VerticalListBordered,
} from './WindowTypes.styles'
import { Spacer } from '@/styles/generic.styles'
import { TabError } from '../TabError/TabError'
import { encodeString } from '@/methods/encode'

interface PermissionDetailsWindowProps {
  side: Side
}

const GroupData: FC<{ group: GroupListItem }> = observer(({ group }) => {
  const store = useContext(StoreContext)
  const { currentlyFocusedWindow } = store.CodeViewState

  return (
    <VerticalListBordered
      $clickable
      onClick={() => {
        store.CodeViewState.addTab({
          tab: {
            title: group.name || '<not specified>',
            type: 'group',
            groupData: group,
          },
          side: currentlyFocusedWindow,
        })
      }}
      key={group?.id}
    >
      <VerticalListItem>
        <ValueTitle>ID:</ValueTitle>
        <Value>{group?.id}</Value>
      </VerticalListItem>
      <VerticalListItem>
        <ValueTitle>Name:</ValueTitle>
        <Value>{group?.name || '<not specified>'}</Value>
      </VerticalListItem>
    </VerticalListBordered>
  )
})

export const PermissionDetailsWindow: FC<PermissionDetailsWindowProps> = observer(({ side }) => {
  const store = useContext(StoreContext)
  const { windowsActiveTabs } = store.CodeViewState
  const tabData = windowsActiveTabs[side] as Tab

  const [lifecycleState, setLifecycleState] = useState<LifecycleState>('init')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const initTabData = async () => {
    setLifecycleState('fetching')
    const res = await listPermissionsForResource({
      resourceType: tabData?.permissionData?.resourceType,
      resourceName: tabData?.permissionData?.resourceName,
    })

    if (res?.success) {
      store.CodeViewState.setTabPropertyValue({
        tabId: tabData.id,
        property: 'permissionData',
        value: res.data,
      })

      setLifecycleState('fetched')
    } else {
      setErrorMessage(res?.error?.message || 'Failed to fetch entity')
      setLifecycleState('error')
    }
  }

  useEffect(() => {
    if (tabData?.permissionData?.allowedGroups) {
      setLifecycleState('fetched')
    } else if (tabData?.permissionData?.resourceType && tabData?.permissionData?.resourceName) {
      initTabData()
    } else {
      setErrorMessage('Group ID not found')
      setLifecycleState('error')
    }
  }, [
    tabData?.permissionData?.resourceName,
    tabData?.permissionData?.resourceType,
    tabData?.permissionData?.allowedGroups,
  ])

  switch (lifecycleState) {
    case 'init':
      return <></>
    case 'fetching':
      return <ContentLoader type="code" />
    case 'fetched':
      return (
        <AccessManagementTabsContainer>
          <TabTitle>
            Permission {tabData?.permissionData?.resourceName} {tabData?.permissionData?.resourceType}
          </TabTitle>

          <Spacer size={20} />

          <VerticalList>
            <VerticalListItem>
              <ValueTitle>Resource name:</ValueTitle>
              <Value>{tabData?.permissionData?.resourceName}</Value>
            </VerticalListItem>

            <VerticalListItem>
              <ValueTitle>Resource type:</ValueTitle>
              <Value>{tabData?.permissionData?.resourceType}</Value>
            </VerticalListItem>

            <VerticalListItem>
              <ValueTitle>Operation:</ValueTitle>
              <Value>{tabData?.permissionData?.operation}</Value>
            </VerticalListItem>

            {!!tabData?.permissionData?.allowedGroups?.length && (
              <VerticalListItem>
                <ValueTitle>Allowed groups:</ValueTitle>
                <Spacer size={10} />
                <VerticalListFlexWrapContainer>
                  {tabData?.permissionData?.allowedGroups.map((group) => <GroupData key={group.id} group={group} />)}
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
          endpoint={`/permissions/type/${encodeString(tabData?.permissionData?.resourceType)}/name/${encodeString(tabData?.permissionData?.resourceName)}`}
          resourceType={'permission'}
          errorMessage={errorMessage}
        />
      )
  }
})
