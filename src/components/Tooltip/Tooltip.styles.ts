import styled from 'styled-components'

// tooltip arrow dimensions
const RATIO = 0.866
const size = 10

export const TooltipContainer = styled.div<{ $isVisible?: boolean; $boundingRect?: DOMRect; $offset?: number }>`
  position: absolute;
  /* display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')}; */
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  top: ${({ $boundingRect, $offset, $isVisible }) => {
    if (!$isVisible) return '-100px'

    const bot = $boundingRect?.bottom
    const height = $boundingRect?.height / 2 + 16

    return `${bot - height + $offset}px`
  }};

  left: ${({ $boundingRect }) => `${$boundingRect?.right + size}px`};

  min-height: 32px;
  min-width: 32px;

  background-color: ${({ theme }) => theme.colors['badge.background']};
  color: ${({ theme }) => theme.colors['dropdown.foreground']};
  font-size: 14px;
  font-weight: 700;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 4px;
  padding: 8px 12px;
`

export const TooltipArrow = styled.div<{ $direction: 'left' | 'right' | 'top' | 'bottom' }>`
  position: absolute;

  ${({ $direction, theme }) => {
    const color = theme.colors['badge.background']

    switch ($direction) {
      case 'left':
        return `
        width: 0;
        height: 0;
        border-top: ${size}px solid transparent;
        border-bottom: ${size}px solid transparent;
        border-right: ${2 * size * RATIO}px solid ${color};
        top: calc(50% - ${size}px);
        left: -${size}px;
      `
      case 'right':
        return `
        width: 0;
        height: 0;
        border-top: ${size}px solid transparent;
        border-bottom: ${size}px solid transparent;
        border-left: ${2 * size * RATIO}px solid ${color};
      `
      case 'top':
        return `
        width: 0;
        height: 0;
        border-left: ${size}px solid transparent;
        border-right: ${size}px solid transparent;
        border-bottom: ${2 * size * RATIO}px solid ${color};
      `
      case 'bottom':
        return `
        width: 0;
        height: 0;
        border-left: ${size}px solid transparent;
        border-right: ${size}px solid transparent;
        border-top: ${2 * size * RATIO}px solid ${color};
      `
    }
  }}
`
