import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import {muiSharedTheme} from "./utils/muiSharedTheme.ts";

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={muiSharedTheme}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)
