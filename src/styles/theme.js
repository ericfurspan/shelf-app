import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light', // dark
    primary: {
      main: '#333333', // 37474f
    },
    secondary: {
      main: '#546e7a', // e3f2fd
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    }
  },
  // contrastThreshold: 1,
  typography: {
    fontFamily: 'Open Sans, sans-serif',
  },
});


export default theme;
