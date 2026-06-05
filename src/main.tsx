import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {CssVarsProvider} from '@mui/joy/styles';
import joyTheme from '@utils/themes/joyTheme.ts';
// import theme from './utils/themes/firstTheme.ts';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider theme={joyTheme}>
      <App />
    </CssVarsProvider>
  </StrictMode>,
)
