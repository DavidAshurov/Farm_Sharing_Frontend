import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import type {Dispatch, SetStateAction} from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState} from "react";

interface Props {
    label: string,
    placeholder: string,
    icon: React.ElementType,
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    error: boolean,
    cancelError: () => void,
    isPassword: boolean,
}

const AuthInputLine = ({label, placeholder, icon: Icon, value, setValue, error, cancelError, isPassword}: Props) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Box sx={{display: 'flex', alignItems: 'center', mb: '1rem'}}>
            <Icon color={'secondary'} sx={{mr: '1rem'}}/>
            <TextField
                label={label}
                type={isPassword && !showPassword ? 'password' : 'text'}
                color={'secondary'}
                fullWidth={true}
                size={'small'}
                placeholder={placeholder}
                value={value}
                error={error}
                helperText={error ? 'This field is required' : ''}
                onChange={(e) => {
                    if (error) {
                        cancelError()
                    }
                    setValue(e.target.value)
                }}
                InputProps={{
                    endAdornment: isPassword ? (
                            <InputAdornment position={'end'}>
                                <IconButton
                                    color={"secondary"}
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>)
                        : undefined
                }}
            />
        </Box>
    );
};

export default AuthInputLine;