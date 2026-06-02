import { createTheme, darken,lighten } from '@mui/material/styles';
import fontFamilyList from '../CSS/fontMap';

const theme = createTheme({
  palette: {
    primary: {
      "main": "#0284C7",
      "light": "#E0F2FE",
      "dark": "#0369A1",
      "contrastText": "#FFFFFF"
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
      "main": "#2563EB",
      "light": "#DBEAFE",
      "dark": "#1D4ED8",
      "contrastText": "#FFFFFF"
    },
    error: {
      "main": "#DC2626",
      "light": "#FEE2E2",
      "dark": "#B91C1C",
      "contrastText": "#FFFFFF"
    },
    warning:{
      "main": "#EA580C",
      "light": "#FFEDD5",
      "dark": "#C2410C",
      "contrastText": "#FFFFFF"
    },
    action: {
      disabledBackground: '#e5e7eb',
      disabled: '#9ca3af',
      disabledOpacity: 0.5,
    },
    gridSaveLayout: {
      main :'#0EA5E9',
      light : '#0ea4e9d4',
      dark : '#0ba8f0',
      contrastText : 'white'
    },
    gridResetFilters:{

    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const colorKey = (ownerState.color || 'primary') as keyof typeof theme.palette;
          const paletteColor = theme.palette[colorKey] as any;

          const baseStyles = {
            fontSize: '10.5px',
            fontFamily: fontFamilyList.noto,
            textTransform: 'none' as const,
            borderRadius: 5,
          };
          
          const disabledStyles = {
            opacity: theme.palette.action.disabledOpacity,
            color: theme.palette.action.disabled,
            backgroundColor: theme.palette.action.disabledBackground,
            borderColor: theme.palette.action.disabledBackground,
          };

          if (ownerState.variant === 'contained') {
            return {
              ...baseStyles,
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
              ...baseStyles,
              backgroundColor: paletteColor.light,
              color: paletteColor.main,
              border: `1px solid ${lighten(paletteColor.main,0.3)}`,
              '&:hover': {
                backgroundColor: lighten(paletteColor.light,0.15),
                borderColor: paletteColor.dark,
              },
              '&.Mui-disabled': disabledStyles,
            };
          }

          return {
            ...baseStyles,
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