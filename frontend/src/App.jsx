// Root application component. Renders the router and sets up Material UI theme.

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import AppRouter from './router/AppRouter';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1A7A6E',
    },
    secondary: {
      main: '#F0A500',
    },
    background: {
      default: '#0D1117',
      paper: '#161B22',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;