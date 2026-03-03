import {useGetUploadUrlMutation} from "../app/api/imagesApi.ts";
import type {imageUploaderState} from "./types/types.ts";
import {useEffect} from "react";

export const useFileUpload = () => {
    const [getUploadUrl] = useGetUploadUrlMutation()

    const uploadFile = async (file: File, folder: string) => {
        const {uploadUrl, tmpUrl} =
            await getUploadUrl(`${folder}/${file.name}`).unwrap()

        const response = await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {'Content-Type': file.type}
        })

        if (!response.ok) {
            throw new Error('Upload failed')
        }

        return tmpUrl
    }

    return {uploadFile}
}

export const useImagePreviewCleanup = (imageState: imageUploaderState) => {
    useEffect(() => {
        if (imageState.type !== 'new') return
        return () => URL.revokeObjectURL(imageState.preview)
    }, [imageState])
}