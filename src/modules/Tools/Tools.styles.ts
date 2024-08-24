import { styled } from 'styled-components'

interface ToolsContainerProps {
  $menuWidth: string
}

export const ToolsWrapper = styled.div<ToolsContainerProps>`
  grid-area: main;
  background-color: ${({ theme }) => theme.colors['editor.background']};
  color: ${({ theme }) => theme.colors['sideBar.foreground']};

  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'leftsidebar tools';
`

export const ToolsContainer = styled.div`
  grid-area: tools;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 20px;
`

export const ToolTitle = styled.h1`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors['editor.foreground']};
`

export const ToolButton = styled.button`
  outline: none;
  cursor: pointer;
  padding: 0 50px;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors['dropdown.foreground']};
  border: 1px solid ${({ theme }) => theme.colors['dropdown.foreground']};
  color: ${({ theme }) => theme.colors['dropdown.background']};

  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 39px;
`
