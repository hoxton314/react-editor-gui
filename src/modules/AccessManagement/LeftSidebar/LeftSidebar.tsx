import { DetailedHTMLProps, FC, HTMLAttributes, useContext } from 'react'
import {
  TypeSelection,
  AccessListTypeTab,
  ContentLoaderSkeleton,
  LeftSidebarWrapper,
  TopContainer,
  ActionButton,
  FilterContainer,
} from './LeftSidebar.styles'
import { DraggableBorder } from '@styles/generic.styles'
import { observer } from 'mobx-react'
import { StoreContext } from '@components/App'
import { AccessManagementTabTypes } from '@store/CodeView.store'
import { UsersList } from './Tables/Users/UsersList'
import { GroupsList } from './Tables/Groups/GroupsList'
import { PermissionsList } from './Tables/Permissions/PermissionsList'
import { SearchInput } from '@components/SearchInput'
import { RefreshButton } from '@components/RefreshButton'
import { Checkbox } from '@components/Checkbox'
import { AddIcon } from '@/components/Icons/AddIcon'

const renderSelectedTabList = (tab: AccessManagementTabTypes) => {
  switch (tab) {
    case 'user':
      return <UsersList />
    case 'group':
      return <GroupsList />
    case 'permission':
      return <PermissionsList />
  }
}

interface LeftSidebarProps {
  dragBarProps: Omit<DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>, 'ref'>
  isResizing: boolean
}

export const LeftSidebar: FC<LeftSidebarProps> = observer(({ dragBarProps, isResizing }) => {
  const store = useContext(StoreContext)
  const { isAccessManagementFetchLoading, shouldIncludeDeleted } = store.CommunicationState
  const { accessManagementSearchQuery, selectedAccessManagementTab } = store.UserInterfaceState.leftSidebar

  const handleTabChange = (tab: AccessManagementTabTypes) => {
    store.UserInterfaceState.setSelectedAccessManagementTab(tab)
  }

  const renderActionButton = (tab: AccessManagementTabTypes) => {
    switch (tab) {
      case 'user':
        return (
          <ActionButton
            onClick={() => {
              store.ModalState.openModal('add-user')
            }}
          >
            <AddIcon size={16} />
            Add User
          </ActionButton>
        )
      case 'group':
        return (
          <ActionButton
            onClick={() => {
              store.ModalState.openModal('add-group')
            }}
          >
            <AddIcon size={16} />
            Add Group
          </ActionButton>
        )
      case 'permission':
        return (
          <ActionButton
            onClick={() => {
              store.ModalState.openModal('add-permission')
            }}
          >
            <AddIcon size={16} />
            Add Permission
          </ActionButton>
        )
    }
  }

  return (
    <>
      <LeftSidebarWrapper>
        <TopContainer $gridRow="1">
          <SearchInput
            disabled={!selectedAccessManagementTab}
            value={accessManagementSearchQuery}
            placeholder="Search by includes"
            onChange={(e) => {
              store.UserInterfaceState.setAccessManagementSearchQuery(e)
            }}
          />
          <RefreshButton
            isLoading={isAccessManagementFetchLoading}
            onClick={() => {
              store.CommunicationState.fetchAllAccessManagementLists()
            }}
          />
        </TopContainer>

        <TopContainer $gridRow="2">
          <FilterContainer>
            <Checkbox
              value={shouldIncludeDeleted}
              onChange={(e) => {
                store.CommunicationState.setShouldIncludeDeleted(e)
              }}
            />
            Include deleted
          </FilterContainer>
          {renderActionButton(selectedAccessManagementTab)}
        </TopContainer>

        <TypeSelection>
          <AccessListTypeTab $active={selectedAccessManagementTab === 'user'} onClick={() => handleTabChange('user')}>
            Users
          </AccessListTypeTab>
          <AccessListTypeTab $active={selectedAccessManagementTab === 'group'} onClick={() => handleTabChange('group')}>
            Groups
          </AccessListTypeTab>
          <AccessListTypeTab
            $active={selectedAccessManagementTab === 'permission'}
            onClick={() => handleTabChange('permission')}
          >
            Permissions
          </AccessListTypeTab>
        </TypeSelection>

        {isAccessManagementFetchLoading ? (
          <ContentLoaderSkeleton type="list" />
        ) : (
          renderSelectedTabList(selectedAccessManagementTab)
        )}

        <DraggableBorder {...dragBarProps} $align="right" $isDragging={isResizing} />
      </LeftSidebarWrapper>
    </>
  )
})
