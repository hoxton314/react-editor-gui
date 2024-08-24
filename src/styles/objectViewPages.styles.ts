import styled from 'styled-components'
import { Animatable } from './generic.styles'

export const PageTopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`

export const PageTitle = styled.h3`
  color: ${({ theme }) => theme.colors.secondary2};
  font-size: 30px;
  line-height: 1.22;

  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 40px;
  width: 100%;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 24px;
  }
`

export const SectionTitle = styled.h4<{ $clickable?: boolean }>`
  color: ${({ theme }) => theme.colors.secondary2};
  font-size: 24px;
  line-height: 1.22;
  margin-bottom: 20px;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`

export const PageContainer = styled.div`
  height: 80vh;
  width: 100%;
  min-height: 200px;
  color: ${({ theme }) => theme.colors.secondary2};
  background-color: ${({ theme }) => theme.colors.quaternary};
  font-family: ${({ theme }) => theme.fonts.familyVariant};
  border-radius: 16px;
  padding: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
  }
`

export const LoaderWrapper = styled.div`
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FlexCol = styled.div<{ $maxHeight?: string; $width?: string }>`
  max-height: ${({ $maxHeight }) => $maxHeight || 'unset'};
  width: ${({ $width }) => $width || '100%'};
  display: flex;
  flex-direction: column;
  /* gap: 32px; */
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`

export const FlexRow = styled.div<{ $maxHeight?: string; $height?: string }>`
  max-height: ${({ $maxHeight }) => $maxHeight || 'unset'};
  height: ${({ $height }) => $height || '100%'};
  display: flex;
  flex-direction: row;
  gap: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;

  width: 100%;
  height: 100%;
`

export const GridCell = styled.div<{ $col?: string; $row?: string; $maxHeight?: string }>`
  grid-column: ${({ $col }) => $col || 'auto'};
  grid-row: ${({ $row }) => $row || 'auto'};
  max-height: ${({ $maxHeight }) => $maxHeight || 'unset'};

  align-items: start;
`

export const TagsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: end;
`

export const TagsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`

export const TagsItem = styled.div<{ $click?: boolean }>`
  color: ${({ theme }) => theme.colors.tertiary2};
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.secondary};

  cursor: ${({ $click }) => ($click ? 'pointer' : 'default')};
`

export const JSONViewerWrapper = styled.div<{ $maxHeight?: string }>`
  width: 100%;
  height: 100%;
  max-height: ${({ $maxHeight }) => $maxHeight || '50vh'};
  position: relative;

  overflow-y: auto;
`

export const PropertyPreviewPopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-height: 200px;
  max-height: 80vh;
  overflow-y: auto;
`

export const PropertyPreviewPopupValue = styled.div`
  color: ${({ theme }) => theme.colors.tertiary2};
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
`

export const VersionList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
`

export const VersionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.tertiary2};

  &:hover {
    background-color: ${({ theme }) => theme.colors.tertiary2};
    cursor: pointer;
  }

  ${Animatable}
`

export const JSONEditorLoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`
