import styled, { createGlobalStyle } from 'styled-components'

export const AppContainer = styled.div`
  position: relative;
`

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  *, *::before, *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-weight: inherit;
  }

  ol, ul {
    list-style: none;
  }
  
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }
  
  a {
    color: inherit;
    cursor: pointer;
    
    &:hover {
      cursor: pointer;
    }
  }
  
  html {
    width: 100%;
    height: 100%;
    font-family: ${({ theme }) => theme.fonts.family};
    font-size: ${({ theme }) => theme.fonts.size}px;
    font-weight: normal;
    box-sizing: border-box;

    body {
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.colors['editor.background']};
      color: ${({ theme }) => theme.colors['sideBar.foreground']};

      ::-webkit-scrollbar {
        width: 16px;
        height: 16px;
      }

      ::-webkit-scrollbar-track {
        -webkit-border-radius: 0px;
        border-radius: 0px;
        background-color: ${({ theme }) => theme.colors['scrollbarSlider.background']};
      }

      ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 0px;
        border-radius: 0px;
        background-color: ${({ theme }) => theme.colors['scrollbarSlider.activeBackground']};

        &:hover {
          background-color: ${({ theme }) => theme.colors['scrollbarSlider.hoverBackground']};
        }
      }

      /* using div instead of div#app makes modal portal visible all the time making website y axis overflow */
      > div#app {
        width: 100%;
        /* height: 100%; */
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
          height: auto;
          display: block;
        }
      }

    }
  }
`
