import {createTheme} from "@mui/material";

export const muiSharedTheme = createTheme({
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
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    '&:focus': {
                        outline: 'none'
                    },
                    textTransform: 'none',
                    color: '#4b9b4b',
                    fontWeight: 'bold',
                    backgroundColor: '#ebe9e9',
                    '&.Mui-selected': {
                        backgroundColor: 'white',
                        color: '#4b9b4b',
                    },
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '1rem',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4b9b4b',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4b9b4b',
                        borderWidth: '2px',
                    },
                },
            },
        },
    }
})