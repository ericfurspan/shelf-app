import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#63a4ff',
      dark: '#004ba0',
    },
    secondary: red,
  },
});

export default function (config) {
  return (
    <MuiThemeProvider theme={theme}>
      <Button
        variant="contained"
        color={config.color}
        size={config.size}
        type={config.type}
        disabled={config.disabled}
        onClick={e => config.onClick && config.onClick(e)}
        className={Array.isArray(config.className) ? config.className.join(' ') : config.className}
      >
        {config.text}
        {config.icon}
      </Button>
    </MuiThemeProvider>
  );
}
