import styled from 'styled-components'
import { Animatable } from '@styles/generic.styles'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors['editor.background']};
`

export const Aligner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 474px;
  height: 236px;
  padding: 45px 36px;
  margin-top: 180px;
  background: #5517ac;

  svg {
    width: 74px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 0px;
    width: 100%;
    height: 100%;
    padding: 45px 18px;
    justify-content: center;

    svg {
      margin-top: -100px;
    }
  }
`

export const LoginButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  width: 100%;
  height: 50px;
  background: #5517ac;
  color: #fff;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    opacity: 0.8;
  }

  ${Animatable}
`
