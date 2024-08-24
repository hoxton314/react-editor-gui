import styled, { css } from 'styled-components'
import ReactSelect from 'react-select'

export const Animatable = css`
  ${({ theme }) =>
    theme.animations.enabled &&
    css`
      transition:
        color ${({ theme }) => theme.animations.duration} ${({ theme }) => theme.animations.function},
        background-color ${({ theme }) => theme.animations.duration} ${({ theme }) => theme.animations.function},
        border-color ${({ theme }) => theme.animations.duration} ${({ theme }) => theme.animations.function},
        outline-color ${({ theme }) => theme.animations.duration} ${({ theme }) => theme.animations.function},
        stroke ${({ theme }) => theme.animations.duration} ${({ theme }) => theme.animations.function},
        fill ${({ theme }) => theme.animations.duration} ${({ theme }) => theme.animations.function};
    `}
`

export const AnimatableAll = css`
  ${({ theme }) =>
    theme.animations.enabled &&
    css`
      transition: all ${({ theme }) => theme.animations.duration} ${({ theme }) => theme.animations.function};
    `}
`

export const HideOnMobile = css`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    display: none;
  }
`

export const HideOnDesktop = css`
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile + 1}px) {
    display: none;
  }
`

export const Spacer = styled.div<{ margin?: string; size?: number; width?: string; $desktopOnly?: boolean }>`
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}

  ${({ margin }) => css`
    margin: ${margin || '0'};
  `}

  ${({ size }) =>
    size &&
    css`
      height: ${size}px;
      min-height: ${size}px;
    `}

  ${({ $desktopOnly }) =>
    $desktopOnly &&
    css`
      @media (max-width: 980px) {
        display: none;
      }
    `}
`

interface DraggableBorderProps {
  $align?: 'left' | 'right' | 'top' | 'bottom'
  $isDragging?: boolean
}

export const DraggableBorder = styled.div<DraggableBorderProps>`
  cursor: col-resize;
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  border: 0px solid ${({ theme }) => theme.colors['activityBar.border']};
  background-color: ${({ $isDragging, theme }) => ($isDragging ? theme.colors['badge.background'] : 'transparent')};

  &:hover {
    background-color: ${({ theme }) => theme.colors['activityBar.border']};

    /* thinking about centering border on the edge of the parent container */
    /* top: ${({ $align }) => ($align === 'top' ? '-2px !important' : '0')};
    bottom: ${({ $align }) => ($align === 'bottom' ? '-2px !important' : '0')};
    left: ${({ $align }) => ($align === 'left' ? '-2px !important' : '0')};
    right: ${({ $align }) => ($align === 'right' ? '-2px !important' : '0')}; */
  }

  ${({ $align }) => {
    switch ($align) {
      case 'top':
        return {
          height: '4px',
          bottom: 'unset',
          // top: $isDragging ? '-2px' : '0',
          borderTopWidth: '1px',
        }
      case 'bottom':
        return {
          height: '4px',
          top: 'unset',
          // bottom: $isDragging ? '-2px' : '0',
          borderBottomWidth: '1px',
        }
      case 'left':
        return {
          width: '4px',
          right: 'unset',
          // left: $isDragging ? '-2px' : '0',
          borderLeftWidth: '1px',
        }
      case 'right':
        return {
          width: '4px',
          left: 'unset',
          // right: $isDragging ? '-2px' : '0',
          borderRightWidth: '1px',
        }
    }
  }}
`

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 6px 6px 6px 12px;
  border-radius: 5px;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.secondary2};
  border: 1px solid ${({ theme }) => theme.colors.quinary};
  resize: none;

  &:focus {
    color: ${({ theme }) => theme.colors.secondary2};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.septenary2};
    border: 1px solid ${({ theme }) => theme.colors.quinary};
    background-color: ${({ theme }) => theme.colors.quinary};
  }
`

export const InvisibleInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`

export const Select = styled(ReactSelect).attrs({
  className: 'react-editor-select',
  classNamePrefix: 'react-editor-select',
})<{ $height?: string; $isClearButtonHidden?: boolean }>`
  width: 100%;
  height: ${({ $height }) => $height || '40px'};
  color: ${({ theme }) => theme.colors['sideBar.foreground']};
  background-color: transparent;

  border-radius: 0px;

  .react-editor-select__clear-indicator {
    display: ${({ $isClearButtonHidden }) => ($isClearButtonHidden ? 'none' : 'flex')};
  }

  .react-editor-select__control {
    height: ${({ $height }) => $height || '40px'};
    border: 1px solid ${({ theme }) => theme.colors['sideBar.foreground']};
    border-radius: 0px;
    background-color: transparent;
    box-shadow: none;

    overflow-y: auto;

    &--menu-is-open {
      border: 1px solid ${({ theme }) => theme.colors['badge.background']};
      box-shadow: none;
    }

    &--is-focused {
      box-shadow: none;
    }

    &:hover {
      border: 1px solid ${({ theme }) => theme.colors['badge.background']};
      filter: brightness(1.1);
    }
  }

  .react-editor-select__control--is-focused {
    border: 1px solid ${({ theme }) => theme.colors['badge.background']};
  }

  .react-editor-select__indicator-separator {
    display: none;
  }

  .react-editor-select__menu {
    background-color: ${({ theme }) => theme.colors['sideBar.background']};
    color: ${({ theme }) => theme.colors['sideBar.foreground']};
  }

  .react-editor-select__option {
    background-color: ${({ theme }) => theme.colors['sideBar.background']};
    color: ${({ theme }) => theme.colors['sideBar.foreground']};
    cursor: pointer;

    &.react-editor-select__option--is-focused {
      /* background-color: ${({ theme }) => theme.colors['badge.background']}; */
      /* color: ${({ theme }) => theme.colors['badge.foreground']}; */
      filter: brightness(1.4);
    }
  }

  .react-editor-select__single-value {
    color: ${({ theme }) => theme.colors['sideBar.foreground']};
  }

  .react-editor-select__placeholder {
    color: ${({ theme }) => theme.colors['sideBar.foreground']};
  }

  .react-editor-select__indicator {
    color: ${({ theme }) => theme.colors['sideBar.foreground']};
  }

  .react-editor-select__multi-value {
    background-color: ${({ theme }) => theme.colors['button.foreground']};

    &__label {
      color: ${({ theme }) => theme.colors['activityBarBadge.foreground']};
    }

    &__remove {
      color: ${({ theme }) => theme.colors['activityBarBadge.foreground']};
    }
  }
`
