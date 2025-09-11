import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0A84FF' },
    background: { default: '#f5f7fb' }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#39FF14' },
    background: { default: '#0b1220' }
  }
});
