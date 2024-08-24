import { StoreContext } from '@/components/App'
import { copyToClipboard } from '@/methods/copyToClipboard'
import { Animatable } from '@/styles/generic.styles'
import { observer } from 'mobx-react'
import { createRef, FC, useContext, useEffect, useState } from 'react'
import { styled } from 'styled-components'

export const StyledReferenceList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`

export const ReferenceItem = styled.li<{ $width?: number }>`
  max-width: 100%;
  padding: 0px 14px;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 39px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors['editor.background']};
  color: ${({ theme }) => theme.colors['sideBar.foreground']};
  cursor: pointer;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    display: block;
    width: ${({ $width }) => ($width > 0 ? `${$width - 28}px` : '100%')};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors['editor.hoverHighlightBackground']};
  }

  ${Animatable}
`

export const ReferenceList: FC = observer(() => {
  const store = useContext(StoreContext)
  const { currentlyFocusedWindow, windowsActiveTabs } = store.CodeViewState

  const tabData = windowsActiveTabs[currentlyFocusedWindow]

  const ReferenceListRef = createRef<HTMLUListElement>()
  const [referenceListWidth, setReferenceListWidth] = useState(0)

  useEffect(() => {
    setReferenceListWidth(ReferenceListRef.current?.clientWidth)
  }, [ReferenceListRef])

  return (
    <StyledReferenceList>
      {tabData?.configurationData?.references?.map((reference, index) => (
        <ReferenceItem key={index} $width={referenceListWidth} onClick={() => copyToClipboard(reference)}>
          <span>{reference}</span>
        </ReferenceItem>
      ))}
    </StyledReferenceList>
  )
})
