import { createTheme, darken } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7c3aed',
      light: '#a78bfa',
      dark: '#5b21b6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0f172a',
      light: '#334155',
      dark: '#020617',
      contrastText: '#fff',
    },
    success: {
      main: '#16a34a',
      light: '#4ade80',
      dark: '#166534',
      contrastText: '#fff',
    },
    info: {
      main: '#0284c7',
      light: '#38bdf8',
      dark: '#0369a1',
      contrastText: '#fff',
    },
    error: {
      main: '#dc2626',
      light: '#f87171',
      dark: '#991b1b',
      contrastText: '#fff',
    },
    action: {
      disabledBackground: '#e5e7eb',
      disabled: '#9ca3af',
      disabledOpacity: 0.5,
    },
    saveLayout: {
        main :'#0EA5E9',
        light : '#0ea4e9d4',
        dark : '#0ba8f0',
        contrastText : 'white'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const colorKey = (ownerState.color || 'primary') as keyof typeof theme.palette;
          const paletteColor = theme.palette[colorKey] as any;

          const disabledStyles = {
            opacity: theme.palette.action.disabledOpacity,
            color: theme.palette.action.disabled,
            backgroundColor: theme.palette.action.disabledBackground,
            borderColor: theme.palette.action.disabledBackground,
          };

          if (ownerState.variant === 'contained') {
            return {
              textTransform: 'none',
              borderRadius: 5,
              boxShadow: 'none',
              backgroundColor: paletteColor.main,
              color: paletteColor.contrastText,
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: paletteColor.dark,
              },
              '&.Mui-disabled': disabledStyles,
            };
          }

          if (ownerState.variant === 'outlined') {
            return {
              textTransform: 'none',
              borderRadius: 5,
              backgroundColor: paletteColor.light,
              color: paletteColor.main,
              border: `1px solid ${paletteColor.main}`,
              '&:hover': {
                backgroundColor: darken(paletteColor.light, 0.12),
                borderColor: paletteColor.dark,
              },
              '&.Mui-disabled': disabledStyles,
            };
          }

          return {
            textTransform: 'none',
            borderRadius: 5,
            backgroundColor: 'transparent',
            color: paletteColor.main,
            '&:hover': {
              backgroundColor: paletteColor.light,
            },
            '&.Mui-disabled': {
              opacity: theme.palette.action.disabledOpacity,
              color: theme.palette.action.disabled,
              backgroundColor: 'transparent',
            },
          };
        },
      },
    },
  },
});

export default theme;