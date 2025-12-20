import {rootApi} from "./rootApi.ts";

const imagesApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getUploadUrl: build.mutation<{uploadUrl:string,tmpUrl:string}, string>({
           query: (params) => `/images/upload-url/${params}`
        }),
    })
})
export const {
    useGetUploadUrlMutation
} = imagesApi