import {Box, Button, Divider, IconButton, Paper, Tooltip, Typography, Zoom} from "@mui/material";
import EditableInfoLine from "./EditableInfoLine.tsx";
import {useSelector} from "react-redux";
import ErrorPage from "../../shared/ErrorPage.tsx";
import {useState} from "react";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {useUpdateUserInfoMutation} from "../../app/api/userApi.ts";
import {useSnackBar} from "../../shared/SnackBar.tsx";

const PersonalInfo = () => {
    const [editMode, setEditMode] = useState(false)
    const [triggerUpdate] = useUpdateUserInfoMutation()
    const {showSnackBar} = useSnackBar()
    const user = useSelector(state => state.auth.user)
    const [userInfo, setUserInfo] = useState<UpdateUserDto>({
        address: user?.address,
        city: user?.city,
        email: user?.email,
        nickname: user?.nickname,
        phoneNumber: user?.phoneNumber,
    })

    const handleSave = async () => {
        try {
            await triggerUpdate(userInfo).unwrap()
            setEditMode(false)
            showSnackBar('Your personal information is updated successfully','success')
        } catch (err) {
            if (err.originalStatus === 400) {
                showSnackBar(err.data,'error')
            }
        }
    }

    return (
        <>
            {user !== null ?
                <Paper elevation={1} sx={{m: '1rem', p: '1rem', textAlign: 'left'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}} gap={1}>
                        <Typography variant={'h5'}>Personal information</Typography>
                        <Tooltip title={editMode ? 'Save' : 'Edit'}
                                 placement={'right'}
                                 arrow
                                 disableInteractive
                                 slots={{
                                     transition: Zoom,
                                 }}>
                            <span>
                                {editMode ?
                                    <IconButton onClick={handleSave} color={"secondary"}>
                                        <CheckBoxIcon/>
                                    </IconButton>
                                    :
                                    <IconButton onClick={() => setEditMode(true)}>
                                        <EditSquareIcon/>
                                    </IconButton>
                                }
                            </span>
                        </Tooltip>
                    </Box>
                    <Divider/>
                    <Box sx={{my: '2rem'}}>
                        <>
                            {
                                ['Nickname', 'PhoneNumber', 'City', 'Address', 'Email'].map(key =>
                                    <EditableInfoLine title={key}
                                                      value={userInfo[key.charAt(0).toLowerCase() + key.slice(1)]}
                                                      disabled={!editMode}
                                                      key={key}
                                                      setValue={(value:string) =>
                                                          setUserInfo(prev => ({...prev, [key.charAt(0).toLowerCase() + key.slice(1)]:value}))}
                                    />)
                            }
                        </>
                    </Box>
                </Paper>
                :
                <ErrorPage message={'You don\'t have access to this page'}/>
            }
        </>
    )
};

export default PersonalInfo;