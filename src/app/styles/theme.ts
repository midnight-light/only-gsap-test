import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#3877EE',
    accent: '#EF5DA8',
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
    lg: '3.5rem', // 56px
    xl: '5rem', // 80px
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    laptop: '1440px',
    desktop: '1920px',
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
      landingTitle: '12.5rem', // 200px
      h1: '3.5rem', // 56px
      h2: '2.625rem', // 42px
      h3: '1.75rem', // 28px
      h4: '1.5rem', // 24px
      h5: '1.25rem', // 20px
      h6: '1rem', // 16px
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
