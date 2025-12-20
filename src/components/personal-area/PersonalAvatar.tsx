import {Avatar, Box, IconButton, styled} from "@mui/material";
import {Dispatch, SetStateAction, useRef, useState} from "react";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import type {AvatarState} from "./PersonalInfo.tsx";

interface Props {
    editMode: boolean,
    currAvatar: string | null,
    avatar: AvatarState,
    setAvatar: Dispatch<SetStateAction<AvatarState>>,
}

const AvatarWrapper = styled(Box)({
    position: 'relative',
    width: '8rem',
    height: '8rem',
    borderRadius: '50%',
    overflow: 'hidden',
    margin: '2rem',
    cursor: 'pointer',
    '&:hover .avatar-overlay': {
        opacity: 1,
    },
})
const Overlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
})
const PersonalAvatar = ({editMode, currAvatar, avatar, setAvatar}: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setAvatar({
            type: 'new',
            file: file,
            preview: URL.createObjectURL(file)
        })
        e.target.value = ''
    }
    const removeAvatar = () => setAvatar({type: 'removed'})
    const src = avatar.type === 'new' ? avatar.preview :
        avatar.type === 'removed' ? '' : currAvatar ?? ''

    return (
        <AvatarWrapper>
            <Avatar
                src={src}
                sx={{
                    width: '100%',
                    height: '100%',
                }}
            />
            {editMode &&
                <Overlay className="avatar-overlay" sx={{pointerEvents: 'auto'}}>
                    <IconButton sx={{color: 'white'}} onClick={() => inputRef.current?.click()}>
                        <PhotoCameraIcon/>
                    </IconButton>
                    <IconButton sx={{color: 'red'}} onClick={removeAvatar}>
                        <DeleteOutlineIcon/>
                    </IconButton>
                </Overlay>
            }
            <input
                ref={inputRef}
                type={'file'}
                accept={'image/*'}
                hidden
                onChange={onFileChange}
            />
        </AvatarWrapper>
    );
};

export default PersonalAvatar;