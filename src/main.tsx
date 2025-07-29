//
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './shared/cart/model/CartProvider';

const theme = createTheme({
    palette: {
        primary: {
            main: "#fefdfd"
        },
        secondary: {
            main: "#4b9b4b"
        }
    },
    // Остальные настройки темы...
})

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CartProvider>
                    <App/>
                </CartProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)