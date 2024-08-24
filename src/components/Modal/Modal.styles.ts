import { styled } from 'styled-components'

export const PageBlur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 19vh;

  background-color: ${({ theme }) => `${theme.colors['sideBar.background']}63`};
  backdrop-filter: blur(4px);
`

export const ModalContainer = styled.div<{ $width?: string }>`
  border-radius: 4px;
  background: ${({ theme }) => theme.colors['dropdown.border']};
  color: ${({ theme }) => theme.colors['editor.foreground']};
  box-shadow: 0px 4px 6.4px 0px #281a21;
  padding: 26px 30px 30px 30px;
  width: ${({ $width }) => $width || '480px'};
  z-index: 1000;
  position: relative;
`

export const ModalCloseWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: red;
  color: ${({ theme }) => theme.colors['dropdown.foreground']};
`

export const ModalFooter = styled.div<{
  $justifyContent?: 'flex-end' | 'center' | 'flex-start' | 'space-between' | 'space-around'
}>`
  width: 100%;
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent || 'flex-end'};
  gap: 20px;

  button {
    outline: none;
    cursor: pointer;
    padding: 0 50px;
    height: 40px;
    border-radius: 4px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors['dropdown.foreground']};
    border: 1px solid ${({ theme }) => theme.colors['dropdown.foreground']};

    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 39px;

    &:last-child {
      background-color: ${({ theme }) => theme.colors['dropdown.foreground']};
      color: ${({ theme }) => theme.colors['dropdown.background']};
    }
  }
`
