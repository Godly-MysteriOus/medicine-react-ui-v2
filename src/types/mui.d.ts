import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';
import '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    saveLayout: PaletteColor;
  }

  interface PaletteOptions {
    saveLayout?: PaletteColorOptions;
  }
}

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    saveLayout: true;
  }
}