import { FC, useContext, useRef } from 'react'
import { ToolsContainer, ToolsWrapper } from './Tools.styles'
import { LeftSidebar } from './LeftSidebar/LeftSidebar'
import { StoreContext } from '@components/App'
import { observer } from 'mobx-react'
import { CreateIncident } from './Components/CreateIncident/CreateIncident'

export const Tools: FC = observer(() => {
  const store = useContext(StoreContext)
  const { menuWidth } = store.UserInterfaceState.gridDimensions
  const { leftSidebar } = store.UserInterfaceState

  const containerRef = useRef<HTMLDivElement>(null)

  const renderTool = () => {
    switch (leftSidebar?.selectedToolsTab) {
      case 'create-incident':
        return <CreateIncident />
      default:
        return <></>
    }
  }

  return (
    <ToolsWrapper $menuWidth={`${menuWidth}px`} ref={containerRef}>
      {/* <LeftSidebar />

      <ToolsContainer>{renderTool()}</ToolsContainer> */}
      <h1>Tools</h1>
    </ToolsWrapper>
  )
})
