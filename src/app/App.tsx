import React from 'react';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/global-styles';
import { theme } from './styles/theme';
import { MainLayout } from '../layouts/main-layout';
import { HistoricalDateSection } from '../features/historical-date/historical-date-section';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainLayout>
        <HistoricalDateSection />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
