import { FC, useContext } from 'react'
import { StoreContext } from '@components/App'
import { CategoryWrapper, CategoryTitle } from '../../RightSidebar.styles'
import { observer } from 'mobx-react'
import { ReferenceList } from './ReferenceList'
import { VersionList } from './VersionList'

export const ConfigurationDetails: FC = observer(() => {
  const store = useContext(StoreContext)
  const { currentlyFocusedWindow, windowsActiveTabs } = store.CodeViewState

  const tabData = windowsActiveTabs[currentlyFocusedWindow]

  return (
    <>
      {!!tabData?.configurationData?.references?.length && (
        <CategoryWrapper>
          <CategoryTitle>References</CategoryTitle>
          <ReferenceList />
        </CategoryWrapper>
      )}

      {!!tabData?.configurationData?.versions?.length && (
        <CategoryWrapper>
          <CategoryTitle>Versions</CategoryTitle>
          <VersionList />
        </CategoryWrapper>
      )}
    </>
  )
})
