import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from '@mui/icons-material/Logout';
import {Box, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {logOut} from "../../app/authSlice.ts";
import {useLogoutMutation} from "../../app/api/authApi.ts";
import {useSnackBar} from "../../shared/SnackBar.tsx";
import {useNavigate} from "react-router-dom";

const PersonalAreaMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()
    const {showSnackBar} = useSnackBar()
    const [open, setOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const handleToggle = () => {
        setOpen(prev => !prev)
    }
    const handleCLose = () => {
        setOpen(false)
    }
    const handleLogout = async () => {
        try {
            await logout().unwrap()
            dispatch(logOut())
            setOpen(false)
        } catch (err) {
            showSnackBar("The server is not responding","error")
        }
    }

    return (
        <>
            <IconButton
                color={"secondary"}
                onClick={handleToggle}
                ref={buttonRef}
            >
                <PersonIcon/>
            </IconButton>
            <Menu
                open={open}
                onClose={handleCLose}
                anchorEl={buttonRef.current}

            >
                <MenuItem onClick={() => navigate('/personal-area')}>
                    <Typography fontWeight={"bold"}>Personal Area</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleLogout()}>
                    <Box display={"flex"} width={'100%'}>
                        <Typography color={'#BD3B1E'} fontWeight={"bold"}>Log out</Typography>
                        <LogoutIcon sx={{ml: 'auto', color: '#BD3B1E'}}/>
                    </Box>
                </MenuItem>
            </Menu>
        </>
    );
};

export default PersonalAreaMenu;