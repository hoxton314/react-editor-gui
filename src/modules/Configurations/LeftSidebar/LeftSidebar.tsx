import { DetailedHTMLProps, FC, HTMLAttributes, createRef, useContext, useEffect, useState } from 'react'
import {
  ConfigurationList,
  ConfigurationTypeSelection,
  ConfigurationTypeTab,
  ContentLoaderSkeleton,
  LeftSidebarWrapper,
  TopContainer,
} from './LeftSidebar.styles'
import { DraggableBorder } from '@styles/generic.styles'
import { observer } from 'mobx-react'
import { StoreContext } from '@components/App'
import { ConfigurationListItem } from './ConfigurationListItem'
import { SearchInput } from '@components/SearchInput'
import { RefreshButton } from '@components/RefreshButton'
import { Categories } from '@/store/UserInterface.store'

interface LeftSidebarProps {
  dragBarProps: Omit<DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>, 'ref'>
  isResizing: boolean
}

export const LeftSidebar: FC<LeftSidebarProps> = observer(({ dragBarProps, isResizing }) => {
  const store = useContext(StoreContext)
  const { configurationCategory1List, configurationCategory2List, isConfigFetchLoading } = store.CommunicationState
  const { configurationsSearchQuery, selectedConfigurationTab } = store.UserInterfaceState.leftSidebar

  const lists = { category1: configurationCategory1List, category2: configurationCategory2List }

  const configurationListRef = createRef<HTMLUListElement>()
  const [configurationListWidth, setConfigurationListWidth] = useState(0)

  useEffect(() => {
    setConfigurationListWidth(configurationListRef.current?.clientWidth)
  }, [configurationListRef])

  const handleTabChange = (tab: Categories) => {
    store.UserInterfaceState.setSelectedConfigurationTab(tab)
  }

  return (
    <LeftSidebarWrapper>
      <TopContainer>
        <SearchInput
          disabled={!selectedConfigurationTab}
          value={configurationsSearchQuery}
          placeholder="Search by includes"
          onChange={(e) => {
            store.UserInterfaceState.setConfigurationsSearchQuery(e)
          }}
        />
        <RefreshButton
          onClick={() => {
            store.CommunicationState.fetchConfigurationLists()
          }}
          isLoading={isConfigFetchLoading}
        />
      </TopContainer>

      {isConfigFetchLoading ? (
        <ContentLoaderSkeleton type="list" />
      ) : (
        <>
          <ConfigurationTypeSelection $isTabSelected={!!selectedConfigurationTab?.length}>
            <ConfigurationTypeTab
              $active={selectedConfigurationTab === 'category1'}
              onClick={() => handleTabChange('category1')}
            >
              Category #1
            </ConfigurationTypeTab>
            <ConfigurationTypeTab
              $active={selectedConfigurationTab === 'category2'}
              onClick={() => handleTabChange('category2')}
            >
              Category #2
            </ConfigurationTypeTab>
          </ConfigurationTypeSelection>

          {!!selectedConfigurationTab?.length && (
            <ConfigurationList ref={configurationListRef}>
              {lists[selectedConfigurationTab]
                ?.filter((item) => item.name.toLowerCase().includes(configurationsSearchQuery.toLowerCase()))
                ?.map((item) => (
                  <ConfigurationListItem width={configurationListWidth} key={item.name} title={item.name} />
                ))}
            </ConfigurationList>
          )}
        </>
      )}

      <DraggableBorder {...dragBarProps} $align="right" $isDragging={isResizing} />
    </LeftSidebarWrapper>
  )
})
