import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: "#fefdfd"
        },
        secondary: {
            main: "#4b9b4b"
        }
    },
    components: {
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    '&:focus': {
                        outline: 'none'
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:focus': {
                        outline: 'none'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:focus': {
                        outline: 'none'
                    }
                }
            }
        }
    }
})

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <App/>
          </ThemeProvider>
      </BrowserRouter>
  </StrictMode>,
)
