import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "./baseQuery.ts";

export const rootApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithRefresh,
    tagTypes: ['Cart'],
    endpoints: () => ({}),
})