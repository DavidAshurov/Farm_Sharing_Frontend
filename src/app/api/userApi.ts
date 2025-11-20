import {rootApi} from "./rootApi.ts";

const userApi = rootApi.injectEndpoints({
    endpoints:(build) => ({
        getMe: build.mutation<User,void>({
            query: () => `/user`,
        }),
        updateUserInfo: build.mutation<User,UpdateUserDto>({
            query: (dto) => ({
                url:'/user',
                method:'PUT',
                body:dto,
            })
        })
    })
})

export const {
    useGetMeMutation,
    useUpdateUserInfoMutation,
} = userApi