import styled, { css } from 'styled-components'

export const SettingsTitle = styled.h1`
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors['editor.foreground']};
`

export const SettingsComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 128px;
`

export const CategoriesContainer = styled.div`
  display: flex;
  /* flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start; 
  flex-wrap: wrap;*/
  gap: 24px;
  width: 100%;
  /* height: 100%; */

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 500px));
  justify-content: center;
`

export interface SettingsCategoryProps {
  $width?: string
  $fadeState?: 'fade' | 'fade-exit'
  $animationDuration?: number
}

export const SettingsCategory = styled.div<SettingsCategoryProps>`
  background-color: ${({ theme }) => theme.colors['sideBar.background']};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 32px;
  border: 1px solid ${({ theme }) => theme.colors['activityBar.border']};
  border-radius: 4px;
  width: 100%;
  max-width: 500px;

  ${({ $width }) => css`
    width: 100%;
    max-width: ${$width};
  `}

  transition: ${({ $animationDuration }) => `opacity ${$animationDuration}ms ease-in-out`};
  opacity: 1;

  ${({ $fadeState }) =>
    $fadeState === 'fade-exit' &&
    css`
      opacity: 0;
    `}
`

export const SettingsButton = styled.button`
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors['button.background']};
  height: 40px;
  padding: 0 20px;
  color: ${({ theme }) => theme.colors['button.foreground']};
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    filter: grayscale();
  }
`

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors['menu.selectionForeground']};
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
`

export const HighlightedText = styled.span`
  color: ${({ theme }) => theme.colors['badge.background']};

  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`

export const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin: 20px 0 8px 0;
`

export const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  position: fixed;
  bottom: 20px;
  left: 100px;
`

export const CheckboxRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  label {
    cursor: pointer;
    user-select: none;
  }
`
