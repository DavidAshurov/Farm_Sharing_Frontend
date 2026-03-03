import {rootApi} from "./rootApi.ts";

import type {UpdateUserDto, User} from "../../utils/types/userTypes.ts";

const userApi = rootApi.injectEndpoints({
    endpoints:(build) => ({
        getMe: build.mutation<User,void>({
            query: () => `/user`,
        }),
        updateUserInfo: build.mutation<User,UpdateUserDto>({
            query: (dto) => ({
                url:'/user',
                method:'PATCH',
                body:dto,
            })
        })
    })
})

export const {
    useGetMeMutation,
    useUpdateUserInfoMutation,
} = userApi