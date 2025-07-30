import {createSlice} from "@reduxjs/toolkit";


const initialState:AuthState = {
    accessToken: null,
    user: null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setToken: (state, action) => {
            state.accessToken = action.payload
        },
        logOut: (state) => {
            state.accessToken = null
            state.user = null
        },
    }
})

export default authSlice.reducer
export const {setUser,setToken,logOut} = authSlice.actions
