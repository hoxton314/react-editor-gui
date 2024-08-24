import { styled } from 'styled-components'
import { ContentLoader as ContentLoaderSkeleton } from '@components/ContentLoader/ContentLoader'
import { Animatable } from '@styles/generic.styles'

interface TabbedCodeViewWrapperProps {
  $horizontalWidth: string
  $isDragging?: boolean

  $isLeftSidebarOpened?: boolean
  $isRightSidebarOpened?: boolean
}

const getProperGridColumn = (isLeftSidebarOpened: boolean, isRightSidebarOpened: boolean) => {
  if (isLeftSidebarOpened && isRightSidebarOpened) {
    return '2'
  } else if (!isLeftSidebarOpened && isRightSidebarOpened) {
    return '1 / 3'
  } else if (isLeftSidebarOpened && !isRightSidebarOpened) {
    return '2 / 4'
  } else {
    return '1 / 4'
  }
}

const getDynamicStyles = (props: TabbedCodeViewWrapperProps) => ({
  gridTemplateColumns: `${props.$horizontalWidth} 1fr`,
  cursor: props.$isDragging ? 'col-resize' : 'default',

  gridColumn: getProperGridColumn(props.$isLeftSidebarOpened, props.$isRightSidebarOpened),
})

export const TabbedCodeViewWrapper = styled.div.attrs<TabbedCodeViewWrapperProps>((props) => ({
  style: getDynamicStyles(props),
}))`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 50px 1fr;

  position: relative;
`

export const WindowContainer = styled.div<{ $isOnlyChild?: boolean }>`
  background-color: ${({ theme }) => theme.colors['editor.background']};
  container-type: inline-size;

  position: relative;
  width: 100%;
  height: 100%;
  /* #TODO reduce based on dynamic parameters */
  max-height: calc(100vh - 42px - 50px);
  overflow-y: auto;
  grid-row: 2 / 3;

  ${({ $isOnlyChild }) =>
    $isOnlyChild &&
    `
    grid-column: 1 / 3;
  `}

  ${Animatable}
`

export const ContentLoader = styled(ContentLoaderSkeleton)`
  padding: 20px;
`
