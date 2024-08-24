import { Theme } from './theme'

export const commonTheme: Pick<Theme, 'breakpoints' | 'fonts' | 'animations'> = {
  breakpoints: {
    mobile: '980px',
    tablet: '1040px',
    desktop: '1280px',
    desktopLarge: '1440px',
  },
  fonts: {
    size: 16,
    family: "'Lato', Arial, sans-serif",
    familyVariant: 'Arial, sans-serif',
  },
  animations: {
    enabled: localStorage.getItem('animations') === 'false' ? false : true,
    duration: '0.5s',
    function: 'ease-out',
  },
}
