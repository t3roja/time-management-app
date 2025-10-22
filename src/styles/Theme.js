import { createTheme } from '@mui/material/styles';
import { colors } from './Colors';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary.main,
    },
    secondary: {
      main: colors.secondary.main,
    },
    border: {
      main: colors.border.main,
    },
    hover: {

    },
    text: {
      light: colors.text.light,
      dark: colors.text.dark,
    },
    critical: {
      main: colors.critical.main
    }
  },
});

export { theme }