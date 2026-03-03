import {Box, CircularProgress, Divider, IconButton, Paper, Tooltip, Typography, Zoom} from "@mui/material";
import EditableInfoLine from "./EditableInfoLine.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {useUpdateUserInfoMutation} from "../../../app/api/userApi.ts";
import {useSnackBar} from "../../../shared/SnackBar.tsx";
import {getChangedFields} from "../../../utils/utilFunctions.ts";
import {setUser} from "../../../app/authSlice.ts";
import type {UpdateUserDto} from "../../../utils/types/userTypes.ts";
import type {imageUploaderState} from "../../../utils/types/types.ts";

import {useFileUpload} from "../../../utils/hooks.ts";
import ImageUploader from "../../../shared/ImageUploader.tsx";

const PersonalInfo = () => {
    const [triggerUpdate] = useUpdateUserInfoMutation()
    const {showSnackBar} = useSnackBar()
    const {uploadFile} = useFileUpload()
    const dispatch = useDispatch()


    const user = useSelector(state => state.auth.user)

    const [isSaving, setIsSaving] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [avatarState, setAvatarState] = useState<imageUploaderState>({type: 'unchanged'})
    const [userUpdateInfo, setUserUpdateInfo] = useState<UpdateUserDto>({
        address: user.address,
        city: user.city,
        email: user.email,
        nickname: user.nickname,
        phoneNumber: user.phoneNumber,
    })
    const handleSave = async () => {
        if (isSaving) return
        if (!userUpdateInfo.nickname) {
            showSnackBar("Nickname can't be empty",'error',7000)
            return
        }
        if (!userUpdateInfo.email) {
            showSnackBar("Email can't be empty",'error',7000)
            return
        }
        try {
            setIsSaving(true)
            const changedFields = getChangedFields(user, userUpdateInfo)
            const payload: Partial<UpdateUserDto> = {...changedFields}
            if (avatarState.type === 'new') {
                payload.avatarTmpKey = await uploadFile(avatarState.file,'avatars')
            }
            if (avatarState.type === 'removed' && user.avatar) {
                payload.avatarTmpKey = ''
            }
            if (Object.keys(payload).length === 0) {
                showSnackBar('Nothing changed', 'info',5000)
                setEditMode(false)
                return
            }
            const updatedUser = await triggerUpdate(payload).unwrap()
            dispatch(setUser(updatedUser))
            setEditMode(false)
            setAvatarState({type: 'unchanged'})
            showSnackBar('Your personal information is updated successfully', 'success',5000)
        } catch (err) {
            if (err.originalStatus === 400) {
                showSnackBar(err.data, 'error')
            } else {
                console.log(err)
            }
        } finally {
            setIsSaving(false)
        }
    }

    return (
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
                                    <IconButton onClick={handleSave} color={"secondary"} disabled={isSaving}>
                                        <span>
                                        {isSaving ?
                                            <CircularProgress color={"secondary"} size={22}/> :
                                            <CheckBoxIcon/>
                                        }
                                        </span>
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
            <ImageUploader
                currentImage={user.avatar}
                imageState={avatarState}
                setImageState={setAvatarState}
                variant="avatar"
                editMode={editMode}
            />
            <Box sx={{my: '2rem'}}>
                <>
                    {
                        ['Nickname', 'PhoneNumber', 'City', 'Address', 'Email'].map(key =>
                            <EditableInfoLine title={key}
                                              value={userUpdateInfo[key.charAt(0).toLowerCase() + key.slice(1)]}
                                              disabled={!editMode}
                                              key={key}
                                              setValue={(value: string) =>
                                                  setUserUpdateInfo(prev => ({
                                                      ...prev,
                                                      [key.charAt(0).toLowerCase() + key.slice(1)]: value
                                                  }))}
                            />)
                    }
                </>
            </Box>
        </Paper>
    )
};

export default PersonalInfo;