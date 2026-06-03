import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';
import '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    gridSaveLayout: PaletteColor;
    gridResetFilters : PaletteColor;
  }

  interface PaletteOptions {
    gridSaveLayout?: PaletteColorOptions;
    gridResetFilters?: PaletteColorOptions;
  }
}

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    gridSaveLayout: true;
    gridResetFilters : true
  }
}