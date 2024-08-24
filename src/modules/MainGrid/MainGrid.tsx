import { FC, useContext } from 'react'
import { observer } from 'mobx-react'
import { EditorViewContainer } from './MainGrid.styles'
import { Menu } from './components/Menu/Menu'
import { StoreContext } from '@components/App'

import { ConfigurationView } from '@modules/Configurations/ConfigurationView'
import { AccessManagement } from '@modules/AccessManagement/AccessManagement'
import { Settings } from '@modules/Settings/Settings'
import { Tools } from '@modules/Tools/Tools'

export const MainGrid: FC = observer(() => {
  const store = useContext(StoreContext)
  const { selectedMenuTab } = store.UserInterfaceState
  const { menuWidth } = store.UserInterfaceState.gridDimensions

  const renderSelectedTab = () => {
    switch (selectedMenuTab) {
      case 'configurations':
        return <ConfigurationView />
      case 'permissions':
        return <AccessManagement />
      case 'tools':
        return <Tools />
      case 'bugs':
        return <h1>Bugs</h1>
      case 'settings':
        return <Settings />
      default:
        return <></>
    }
  }

  return (
    <EditorViewContainer $menuWidth={`${menuWidth}px`}>
      <Menu />

      {renderSelectedTab()}
    </EditorViewContainer>
  )
})
