import { extendTheme } from '@mui/joy/styles';
import fontFamilyList from '@utils/CSS/fontMap';
const sizeOverrides = (ownerState:any) => {
  if (ownerState.size === 'sm') return { minHeight: '25px', padding: '4px 8px',fontSize:"0.65rem" };
  if (ownerState.size === 'md') return { minHeight: '40px', padding: '8px 12px', fontSize:'0.85rem'};
  return {};
}
// Extract the custom palette out of the global theme object
const customButtonPalettes = {
  primary: {
    solidBg: '#3b82f6',
    solidHoverBg: '#2563eb',
    solidActiveBg: '#1d4ed8',
    softBg: '#dbeafe',       
    softHoverBg: '#bfdbfe',
    softActiveBg: '#93c5fd',
    softColor: '#1e3a8a',   
    outlinedColor: '#1e40af', 
    outlinedBorder: '#93c5fd',
    outlinedHoverBg: '#cce2ff',
    outlinedActiveBg: '#bfdbfe',
    outlinedBg : '#dbeafe',
    plainColor: '#1e40af',
    plainHoverBg: '#dbeafe',
    plainActiveBg: '#bfdbfe',
  },
  danger: {
    solidBg: '#ef4444', 
    solidHoverBg: '#dc2626',
    solidActiveBg: '#b91c1c',
    softBg: '#fcd0d0',        
    softHoverBg: '#ffc7c7',
    softActiveBg: '#fca5a5',
    softColor: '#991b1b',    
    outlinedColor: '#dc2626',
    outlinedBorder: '#fca5a5',
    outlinedHoverBg: '#ffd0d0',
    outlinedActiveBg: '#ffc2c2',
    outlinedBg: '#ffdada',
    plainColor: '#b91c1c',
    plainHoverBg: '#fee2e2',
    plainActiveBg: '#fecaca',
    solidDisabledBg: '#efefef9f',
    softDisabledBg: '#efefef9f',
    outlinedDisabledBg: '#efefef9f',
    plainDisabledBg: '#efefef9f',
  },
  warning: {
    solidBg: '#eb9113',
    solidHoverBg: '#d97706e4',
    solidActiveBg: '#b45f09c8',
    softBg: '#fcb04594',
    softHoverBg: '#fcb045d1',
    softActiveBg: '#FCB045',
    softColor: '#b44809',
    outlinedBg : "#fff0de",
    outlinedColor: '#9a3412',
    outlinedBorder: '#fdba74',
    outlinedHoverBg: '#fdead1',
    outlinedActiveBg: '#fce1be',
    plainColor: '#d97706',
    plainHoverBg: '#fffbeb',
    plainActiveBg: '#fef3c7',
    solidDisabledBg: '#efefef9f',
    softDisabledBg: '#efefef9f',
    outlinedDisabledBg: '#efefef9f',
    plainDisabledBg: '#efefef9f',
  },
  success: {
    solidBg: '#0d9488',
    solidHoverBg: '#0f766e',
    solidActiveBg: '#115e59',
    softBg: '#f0fdfa',
    softHoverBg: '#ccfbf1',
    softActiveBg: '#99f6e4',
    softColor: '#115e59',
    outlinedColor: '#0d9488',
    outlinedBorder: '#99f6e4',
    outlinedHoverBg: '#f0fdfa',
    outlinedActiveBg: '#ccfbf1',
    plainColor: '#0d9488',
    plainHoverBg: '#f0fdfa',
    plainActiveBg: '#ccfbf1',
  },
  neutral: {
    solidBg: '#64748b',
    solidHoverBg: '#475569',
    solidActiveBg: '#334155',
    softBg: '#f8fafc',
    softHoverBg: '#f1f5f9',
    softActiveBg: '#e2e8f0',
    softColor: '#334155',
    outlinedColor: '#64748b',
    outlinedBorder: '#e2e8f0',
    outlinedHoverBg: '#f8fafc',
    outlinedActiveBg: '#f1f5f9',
    plainColor: '#64748b',
    plainHoverBg: '#f8fafc',
    plainActiveBg: '#f1f5f9',
  },
};
// Local color will be derived from ownerState per-button
const customTheme = extendTheme({
  components: {
    JoyInput: { styleOverrides: { root: ({ ownerState }) => sizeOverrides(ownerState) } },
    JoySelect: { styleOverrides: { root: ({ ownerState }) => sizeOverrides(ownerState) } },
    JoyTextarea: { styleOverrides: { root: ({ ownerState }) => sizeOverrides(ownerState) } },
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState = {} }: { ownerState?: Record<string, any> }) => {
          const color = ownerState.color as string | undefined;
          // 1. Define standard sizing and base font styles
          const baseStyles = {
            fontFamily: fontFamilyList.noto,
            minHeight: '0px',
            height: 'fit-content',
            lineHeight: '1',
            ...(ownerState.size === 'xs' && {
              fontSize: '0.5rem',
              paddingBlock: '0.375rem',
              paddingInline: '0.75rem',
            }),
            ...(ownerState.size === 'sm' && {
              fontSize: '0.625rem',
              paddingBlock: '0.5rem',
              paddingInline: '0.9rem',
            }),
            ...(ownerState.size === 'md' && {
              fontSize: '0.8rem',
              paddingBlock: '0.625rem',
              paddingInline: '1.75rem',
            }),
            ...(ownerState.size === 'lg' && {
              fontSize: '1rem',
              paddingBlock: '0.85rem',
              paddingInline: '3rem',
            }),
            ...(ownerState.size === 'xl' && {
              fontSize: '1.125rem',
              paddingBlock: '1rem',
              paddingInline: '3.5rem',
            }),
          };

          // 2. Fetch the specific palette for the current color prop
          const palette = color ? (customButtonPalettes as Record<string, any>)[color] : undefined;

          // If the color isn't in our custom object, let Joy UI handle default colors
          if (!palette) return baseStyles;

          let variantStyles = {};

          // 3. Apply styles based on the specific variant
          if (ownerState.variant === 'solid') {
            variantStyles = {
              backgroundColor: palette.solidBg,
              color: '#fff', // Defaulting solid text to white
              '&:hover': { backgroundColor: palette.solidHoverBg },
              '&:active': { backgroundColor: palette.solidActiveBg },
              '&.Mui-disabled': { backgroundColor: palette.solidDisabledBg || '#efefef9f' },
            };
          } else if (ownerState.variant === 'soft') {
            variantStyles = {
              backgroundColor: palette.softBg,
              color: palette.softColor,
              '&:hover': { backgroundColor: palette.softHoverBg },
              '&:active': { backgroundColor: palette.softActiveBg },
              '&.Mui-disabled': { backgroundColor: palette.softDisabledBg || '#efefef9f' },
            };
          } else if (ownerState.variant === 'outlined') {
            variantStyles = {
              backgroundColor: palette.outlinedBg || 'transparent',
              color: palette.outlinedColor,
              borderColor: palette.outlinedBorder,
              '&:hover': { backgroundColor: palette.outlinedHoverBg },
              '&:active': { backgroundColor: palette.outlinedActiveBg },
              '&.Mui-disabled': { backgroundColor: palette.outlinedDisabledBg || '#efefef9f' },
            };
          } else if (ownerState.variant === 'plain') {
            variantStyles = {
              backgroundColor: 'transparent',
              color: palette.plainColor,
              '&:hover': { backgroundColor: palette.plainHoverBg },
              '&:active': { backgroundColor: palette.plainActiveBg },
              '&.Mui-disabled': { backgroundColor: palette.plainDisabledBg || 'transparent' },
            };
          }

          // Combine the base sizing with our custom dynamic colors
          return {
            ...baseStyles,
            ...variantStyles,
          };
        },
      },
    },
  },
});

export default customTheme;