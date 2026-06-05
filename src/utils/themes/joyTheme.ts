import { extendTheme } from '@mui/joy/styles';
import fontFamilyList from '@utils/CSS/fontMap';

const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
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
        // ==========================================
        // 2. DANGER (Coral/Red from Save Layout/Delete)
        // ==========================================
        danger: {
          solidBg: '#ef4444', 
          solidHoverBg: '#dc2626',
          solidActiveBg: '#b91c1c',
          softBg: '#fee2e2',        
          softHoverBg: '#fecaca',
          softActiveBg: '#fca5a5',
          softColor: '#991b1b',    
          outlinedColor: '#dc2626',
          outlinedBorder: '#fca5a5',
          outlinedHoverBg: '#fee2e2',
          outlinedActiveBg: '#fecaca',
          outlinedBg: '#fef2f2',
          plainColor: '#b91c1c',
          plainHoverBg: '#fee2e2',
          plainActiveBg: '#fecaca',
        },
        // ==========================================
        // 3. WARNING (Amber from Edit Button)
        // ==========================================
        warning: {
          solidBg: '#f59e0b',
          solidHoverBg: '#d97706',
          solidActiveBg: '#b45309',
          softBg: '#fffbeb',
          softHoverBg: '#fef3c7',
          softActiveBg: '#fde68a',
          softColor: '#b45309',
          outlinedColor: '#d97706',  // Matches "Edit" text
          outlinedBorder: '#fde68a', // Matches "Edit" border
          outlinedHoverBg: '#fffbeb',
          outlinedActiveBg: '#fef3c7',
          plainColor: '#d97706',
          plainHoverBg: '#fffbeb',
          plainActiveBg: '#fef3c7',
        },
        // ==========================================
        // 4. SUCCESS (Teal tied to Medisure Logo)
        // ==========================================
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
        // ==========================================
        // 5. NEUTRAL (Slate/Gray from Grid/Headers)
        // ==========================================
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
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root:({ownerState})=> ({
          // Applies universally to all buttons, variants, and colors
            
            fontFamily: fontFamilyList.noto,
            minHeight: '0px',
            height: 'fit-content',
            // 3. Reset Line Height (Text often forces height)
            lineHeight: '1',
            ...(ownerState.size === 'xs' && {
                fontSize: '0.5rem',
                paddingBlock: '0.375rem',
                paddingInline: '0.75rem',
            }),
            ...(ownerState.size === 'sm' && {
                fontSize: '0.625rem',
                paddingBlock: '0.55rem',
                paddingInline: '1rem',
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
        }),
      },
    },
  },
});

export default customTheme;