import {Box, TextField, Typography} from "@mui/material";
import type {Dispatch, SetStateAction} from "react";

interface Props {
    title: string,
    value: string,
    disabled: boolean,
    setValue: Dispatch<SetStateAction<string>>,
}

const EditableInfoLine = ({title, value, disabled, setValue}: Props) => {
    return (
        <TextField variant={"outlined"}
                   label={title}
                   defaultValue={value}
                   size={"small"}
                   disabled={disabled}
                   sx={{
                       width: '12rem',
                       mr:'1rem',
                       "& .MuiInputLabel-root.Mui-focused": {
                           color: "secondary.main",
                       },
                   }}
                   onChange={e => setValue(e.target.value)}
        />
    );
};

export default EditableInfoLine;