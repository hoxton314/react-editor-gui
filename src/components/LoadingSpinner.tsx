import { FC } from 'react'
import styled, { keyframes, useTheme } from 'styled-components'
const rotate = keyframes`
  100% {
    transform: rotate(1turn);
  }
`

interface ContainerProps {
  $width?: string
  $height?: string
  $bgColor?: string
  $primary?: string
  $thickness?: number
  $bgIframe?: string
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  z-index: 0;
  width: ${({ $width }) => ($width ? $width : '50px')};
  height: ${({ $width }) => ($width ? $width : '50px')};
  display: block;
  box-sizing: border-box;
  border-radius: 50px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: ${({ $bgColor }) => ($bgColor ? $bgColor : '#399953')};
    background-repeat: no-repeat;
    background-size:
      50% 50%,
      50% 50%;
    background-position:
      0 0,
      100% 0,
      100% 100%,
      0 100%;
    background-image: linear-gradient(
        ${({ $primary }) => ($primary ? $primary : '#399953')},
        ${({ $primary }) => ($primary ? $primary : '#399953')}
      ),
      linear-gradient(
        ${({ $bgColor }) => ($bgColor ? $bgColor : '#ffffff')},
        ${({ $bgColor }) => ($bgColor ? $bgColor : '#ffffff')}
      ),
      linear-gradient(
        ${({ $bgColor }) => ($bgColor ? $bgColor : '#ffffff')},
        ${({ $bgColor }) => ($bgColor ? $bgColor : '#ffffff')}
      );
    animation: ${rotate} 0.6s cubic-bezier(0.67, 0.34, 0.3, 0.71) infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: ${({ $thickness }) => ($thickness ? $thickness + 'px' : '6px')};
    top: ${({ $thickness }) => ($thickness ? $thickness + 'px' : '6px')};
    width: calc(100% - ${({ $thickness }) => ($thickness ? $thickness * 2 + 'px' : '12px')});
    height: calc(100% - ${({ $thickness }) => ($thickness ? $thickness * 2 + 'px' : '12px')});
    background: ${({ $bgIframe, $primary, $bgColor }) => ($bgIframe ? $bgIframe : $primary ? $bgColor : '#ffffff')};
    border-radius: 50px;
  }
`

export const Wrap = styled.div<{ padding: string; height: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (props.padding ? props.padding : '0')};
  height: ${(props) => (props.height ? props.height : 'auto')};
`

interface LoadingSpinnerProps {
  width?: string
  height?: string
  padding?: string
  thickness?: number
  bgColor?: string
  primary?: string
  bgIframe?: string
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  width,
  height,
  padding,
  thickness,
  bgColor,
  primary,
  bgIframe,
}) => {
  const theme = useTheme()

  return (
    <Wrap padding={padding} height={height}>
      <Container
        id="loading"
        $width={width || '50px'}
        $thickness={thickness}
        $primary={primary || theme?.colors['editor.foreground'] || '#399953'}
        $bgColor={bgColor || theme?.colors['editor.background'] || '#ffffff'}
        $bgIframe={bgIframe || theme?.colors['editor.background'] || '#ffffff'}
      ></Container>
    </Wrap>
  )
}
