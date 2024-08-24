import styled from 'styled-components'
import { Animatable } from '@styles/generic.styles'

export const StyledThemeSwitcher = styled.div`
  width: 110px;
  height: 32px;
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.senary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary4};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border: 0;
    width: calc(100% - 2 * 15px);
    height: 48px;
    border-radius: 26px;
  }

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: inherit;
    text-decoration: inherit;
    gap: 10px;

    ${Animatable}
  }

  ${Animatable}
`
