import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice.ts";
import {rootApi} from "./api/rootApi.ts";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        [rootApi.reducerPath]:rootApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch