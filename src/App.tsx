import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Box, Container } from '@mui/material';
import LatestBlocks from './components/LatestBlocks';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'black', minHeight: '100vh', padding: 4 }}>
        <Container maxWidth="lg">
          <LatestBlocks />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;