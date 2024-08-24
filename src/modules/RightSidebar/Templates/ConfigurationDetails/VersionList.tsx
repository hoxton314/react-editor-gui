import { StoreContext } from '@/components/App'
import { Animatable } from '@/styles/generic.styles'
import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import styled from 'styled-components'

export const StyledVersionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

export const VersionItem = styled.li`
  cursor: pointer;
  padding: 10px 20px;
  margin: 0 -20px;

  display: block;
  width: calc(100% + 40px);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background-color: ${({ theme }) => theme.colors['editor.hoverHighlightBackground']};
  }

  ${Animatable}
`

export const VersionList: FC = observer(() => {
  const store = useContext(StoreContext)
  const { currentlyFocusedWindow, windowsActiveTabs } = store.CodeViewState

  const tabData = windowsActiveTabs[currentlyFocusedWindow]

  const openVersionPreviewTab = (version: string) => {
    const versionObject = tabData?.configurationData?.versions?.find((item) => item.configurationId === version)

    store.CodeViewState.addTab({
      tab: {
        type: 'json-preview',
        title: versionObject?.configurationId,
        jsonObject: JSON.stringify(versionObject, null, 4),
      },
      side: currentlyFocusedWindow,
    })
  }

  return (
    <StyledVersionList>
      {tabData?.configurationData?.versions?.map((version, index) => (
        <VersionItem key={index} onClick={() => openVersionPreviewTab(version?.configurationId)}>
          {version?.configurationId}
        </VersionItem>
      ))}
    </StyledVersionList>
  )
})
