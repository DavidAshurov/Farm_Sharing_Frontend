import {BaseQueryFn, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {RootState} from "../store.ts";
import {logOut, setToken} from "../authSlice.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.accessToken
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
    credentials: 'include',
})

export const baseQueryWithRefresh: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args,api,extraOptions)
    if (result.error?.status === 401) {
        const refreshResult = await baseQuery(
            {
                url:'/auth/refresh',
                method:'POST',
            },
            api,extraOptions
        )
        if (refreshResult.data) {
            const newToken = (refreshResult.data as {accessToken:string}).accessToken
            api.dispatch(setToken(newToken))
            result = await baseQuery(args,api,extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}