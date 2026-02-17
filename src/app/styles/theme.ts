import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#3877EE',
    secondary: '#6c757d',
    background: '#F4F5F9',
    foreground: '#42567A',
    muted: '#d9dde4',
    text: '#42567A',
    error: '#dc3545',
    success: '#28a745',
  },
  spacing: {
    none: '0',
    xs: '0.43rem', // 7px
    sm: '1.25rem', // 20px
    md: '1.68rem', // 27px
    lg: '2.13rem', // 34px
    xl: '5rem', // 80px
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },
  typography: {
    fontFamily:
      '-apple-system, "PT Sans", BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      sm: '12px',
      md: '16px',
      lg: '20px',
      xl: '24px',
    },
    heading: {
      h1: '58px',
      h2: '42px',
      h3: '28px',
      h4: '24px',
      h5: '20px',
      h6: '16px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1',
      normal: '1.5',
      relaxed: '2',
    },
  },
};
