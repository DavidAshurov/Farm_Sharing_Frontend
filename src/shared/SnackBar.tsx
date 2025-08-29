import {createContext, ReactNode, useContext, useState} from "react";
import {Alert, Snackbar} from "@mui/material";

type SnackBarContextType = {
    showSnackBar: (message:string,severity?:'success'|'error'|'info'|'warning') => void;
}

const SnackBarContext = createContext<SnackBarContextType|undefined>(undefined)

export const useSnackBar = () => {
    const context = useContext(SnackBarContext)
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider')
    }
    return context
}

export const SnackBarProvider = ({children} : {children: ReactNode}) => {
    const [open,setOpen] = useState(false)
    const [message,setMessage] = useState('')
    const [severity,setSeverity] = useState<'success'|'error'|'info'|'warning'>('info')

    const showSnackBar = (msg:string,sev:'success'|'error'|'info'|'warning' = 'info') => {
        setMessage(msg)
        setSeverity(sev)
        setOpen(true)
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setOpen(false)
    }

    return (
        <SnackBarContext.Provider value={{showSnackBar}}>
            {children}
            <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={7000}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant={"filled"}
                >
                    {message}
                </Alert>
            </Snackbar>
        </SnackBarContext.Provider>
    );
};
