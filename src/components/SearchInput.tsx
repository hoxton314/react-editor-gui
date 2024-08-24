import { FC } from 'react'
import { styled } from 'styled-components'
import { Animatable } from '@styles/generic.styles'

export const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;

  ${Animatable}
`

export const SearchIconWrapper = styled.div`
  height: 50px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors['icon.foreground']};

  position: absolute;
  top: 0;
  left: 0;

  ${Animatable}
`

export const StyledSearchInput = styled.input`
  border: none;
  background-color: inherit;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors['sideBar.foreground']};
  width: 100%;
  height: 50px;
  padding-left: 55px;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: relative;

  &::placeholder {
    color: ${({ theme }) => `${theme.colors['sideBar.foreground']}55`};
    font-size: 14px;
  }

  &:focus {
    background-color: ${({ theme }) => `${theme.colors['activityBar.inactiveForeground']}35`};
  }

  ${Animatable}
`

interface SearchInputProps {
  disabled: boolean
  value: string
  placeholder: string
  onChange: (e: string) => void
}

export const SearchInput: FC<SearchInputProps> = ({ disabled, value, placeholder, onChange }) => {
  return (
    <Container>
      <SearchIconWrapper>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <g clipPath="url(#clip0_108_190)">
            <path
              d="M25.7039 24.2744L19.3586 17.9292C20.9358 16.0326 21.886 13.5971 21.886 10.9434C21.886 4.90917 16.977 0 10.9431 0C4.90903 0 0 4.90917 0 10.9434C0 16.9771 4.90903 21.8859 10.9431 21.8859C13.5967 21.8859 16.0323 20.9358 17.929 19.3586L24.2744 25.7039C24.4717 25.9013 24.7305 26 24.9891 26C25.2478 26 25.5066 25.9013 25.704 25.7039C26.0988 25.3091 26.0988 24.6692 25.7039 24.2744ZM2.02173 10.9434C2.02173 6.02395 6.02381 2.02173 10.9431 2.02173C15.8622 2.02173 19.8642 6.02395 19.8642 10.9434C19.8642 15.8624 15.8622 19.8642 10.9431 19.8642C6.02381 19.8642 2.02173 15.8624 2.02173 10.9434Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_108_190">
              <rect width="26" height="26" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </SearchIconWrapper>
      <StyledSearchInput
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value)
        }}
      />
    </Container>
  )
}
