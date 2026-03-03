import {Avatar, Box, IconButton, Typography} from "@mui/material"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import {Dispatch, SetStateAction, useCallback, useRef, useState} from "react"
import type {imageUploaderState} from "../utils/types/types.ts";
import {useImagePreviewCleanup} from "../utils/hooks.ts";

interface Props {
    currentImage: string | null,
    imageState: imageUploaderState,
    setImageState: Dispatch<SetStateAction<imageUploaderState>>,
    variant: "product" | "avatar",
    editMode?: boolean,
}

const ImageUploader = ({currentImage, imageState, setImageState, variant, editMode = true}: Props) => {
    useImagePreviewCleanup(imageState)
    const [isDragging, setIsDragging] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleFiles = useCallback((file: File) => {
        setImageState({
            type: "new",
            file,
            preview: URL.createObjectURL(file),
        })
    }, [setImageState])

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (variant !== "product") return
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const file = e.dataTransfer.files?.[0]
        if (file && file.type.startsWith("image/")) {
            handleFiles(file)
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        if (variant !== "product") return
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        if (variant !== "product") return
        setIsDragging(false)
    }

    const handleClick = () => {
        if (!editMode) return
        inputRef.current?.click()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFiles(file)
        e.target.value = ""
    }

    const removeImage = () => {
        if (!editMode) return
        setImageState({type: "removed"})
    }

    const src = imageState.type === "new" ? imageState.preview
            : imageState.type === "removed" ? "" : currentImage ?? ""

    // ==========================
    // PRODUCT DESIGN
    // ==========================
    if (variant === "product") {
        return (
            <Box
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                sx={{
                    height: "12rem",
                    border: "2px dashed",
                    borderColor: isDragging ? "secondary.main" : "grey.400",
                    borderRadius: 2,
                    textAlign: "center",
                    cursor: editMode ? "pointer" : "default",
                    transition: "0.2s",
                    backgroundColor: isDragging ? "action.hover" : "transparent",
                    overflow: "hidden",
                }}
            >
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleInputChange}
                />
                <>
                    {src ? (
                        <Box sx={{position: "relative", width: "100%", height: "100%"}}>
                            <Box
                                component="img"
                                src={src}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 1,
                                }}
                            />

                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    removeImage()
                                }}
                                sx={{
                                    position: "absolute",
                                    top: 6,
                                    right: 6,
                                    backgroundColor: "rgba(0,0,0,0.55)",
                                    color: "red",
                                    "&:hover": {
                                        backgroundColor: "rgba(0,0,0,0.75)",
                                    },
                                }}
                            >
                                <DeleteOutlineIcon sx={{fontSize: 18}}/>
                            </IconButton>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography color="text.secondary">
                                Drag & drop an image here, or click to select
                            </Typography>
                            <FileUploadIcon fontSize="large" color="action"/>
                        </Box>
                    )}
                </>
            </Box>
        )
    }

    // ==========================
    // AVATAR DESIGN
    // ==========================
    if (variant === 'avatar') {
        return (
            <Box
                sx={{
                    position: "relative",
                    width: "8rem",
                    height: "8rem",
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "2rem",
                    cursor: editMode ? "pointer" : "default",
                    "&:hover .avatar-overlay": {
                        opacity: editMode ? 1 : 0,
                    },
                }}
            >
                <Avatar
                    src={src}
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                />
                <>
                    {editMode && (
                        <Box
                            className="avatar-overlay"
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                background: "rgba(0,0,0,0.45)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "1rem",
                                opacity: 0,
                                transition: "opacity 0.3s ease",
                            }}
                        >
                            <IconButton
                                sx={{color: "white"}}
                                onClick={() => inputRef.current?.click()}
                            >
                                <PhotoCameraIcon/>
                            </IconButton>

                            <IconButton
                                sx={{color: "red"}}
                                onClick={removeImage}
                            >
                                <DeleteOutlineIcon/>
                            </IconButton>
                        </Box>
                    )}
                </>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleInputChange}
                />
            </Box>
        )
    }
}

export default ImageUploader