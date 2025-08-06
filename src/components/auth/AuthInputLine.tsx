import {Box, TextField} from "@mui/material";
import type {Dispatch, SetStateAction} from "react";

interface Props {
    label: string,
    placeholder: string,
    icon: React.ElementType,
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    error:boolean,
    cancelError: () => void
}

const AuthInputLine = ({label, placeholder, icon: Icon, value, setValue, error, cancelError}: Props) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', mb: '1rem'}}>
            <Icon color={'secondary'} sx={{mr: '1rem'}}/>
            <TextField
                label={label}
                color={'secondary'}
                fullWidth={true}
                size={'small'}
                placeholder={placeholder}
                value={value}
                error={error}
                helperText={error?'This field is required':''}
                onChange={(e) => {
                    if (error) {
                        cancelError()
                    }
                    setValue(e.target.value)
                }}
            />
        </Box>
    );
};

export default AuthInputLine;