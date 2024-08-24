import { FC, useContext } from 'react'
import { AccessListTypeTab, LeftSidebarWrapper } from './LeftSidebar.styles'
import { observer } from 'mobx-react'
import { StoreContext } from '@components/App'
import { ToolsTab } from '@/store/UserInterface.store'

export const LeftSidebar: FC = observer(() => {
  const store = useContext(StoreContext)
  const { selectedToolsTab } = store.UserInterfaceState.leftSidebar
  const { isAllowedIncidentManagement } = store.CommunicationState.capabilitiesComputed

  const handleTabChange = (tab: ToolsTab) => {
    store.UserInterfaceState.setSelectedToolsTab(tab)
  }

  return (
    <>
      <LeftSidebarWrapper>
        <AccessListTypeTab $active={selectedToolsTab === 'links'} onClick={() => handleTabChange('links')}>
          Links
        </AccessListTypeTab>
        {isAllowedIncidentManagement && (
          <AccessListTypeTab
            $active={selectedToolsTab === 'create-incident'}
            onClick={() => handleTabChange('create-incident')}
          >
            Create Incident
          </AccessListTypeTab>
        )}
      </LeftSidebarWrapper>
    </>
  )
})
