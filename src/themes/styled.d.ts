import { Theme } from './theme'

declare module 'styled-components' {
  /* eslint @typescript-eslint/no-empty-interface: "off" */
  export interface DefaultTheme extends Theme {}
}
