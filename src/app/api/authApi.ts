import {rootApi} from "./rootApi.ts";

const authApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        signUp: build.mutation<boolean, NewUserDto>({
            query: (userData) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body: userData,
            })
        }),
        signIn: build.mutation<AuthState, Credentials>({
            query: (credentials) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body: credentials,
            })
        }),
        refresh: build.mutation<{ accessToken: string }, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            })
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            })
        })
    })
})

export const {
    useSignUpMutation,
    useSignInMutation,
    useRefreshMutation,
    useLogoutMutation
} = authApi