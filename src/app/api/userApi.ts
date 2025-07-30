import {rootApi} from "./rootApi.ts";

const userApi = rootApi.injectEndpoints({
    endpoints:(build) => ({
        getMe: build.mutation<User,void>({
            query: () => `/user`,
        })
    })
})

export const {useGetMeMutation} = userApi