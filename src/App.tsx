import './App.css'
import {Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import OffersPage from "./components/offers/OffersPage.tsx";
import {useEffect, useState} from "react";
import {useGetMeMutation} from "./app/api/userApi.ts";
import {useDispatch, useSelector} from "react-redux";
import {useRefreshMutation} from "./app/api/authApi.ts";
import {logOut, setToken, setUser} from "./app/authSlice.ts";
import AuthPage from "./components/auth/AuthPage.tsx";
import PersonalAreaPage from "./components/personal-area/PersonalAreaPage.tsx";
import {CircularProgress} from "@mui/material";
import ErrorPage from "./shared/ErrorPage.tsx";

function App() {
    const [isAppReady, setIsAppReady] = useState(false)
    const [noConnection, setNoConnection] = useState(false)
    const [triggerGetMe] = useGetMeMutation()
    const [triggerRefresh] = useRefreshMutation()
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.accessToken)
    useEffect(() => {
        (async () => {
            try {
                if (!token) {
                    const refresh = await triggerRefresh().unwrap()
                    dispatch(setToken(refresh.accessToken))
                }
                const me = await triggerGetMe().unwrap()
                dispatch(setUser(me))
            } catch(err) {
                if (err?.status === 500) {
                    setNoConnection(true)
                }
                dispatch(logOut())
            } finally {
                setIsAppReady(true)
            }
        })()
    }, [])

    if (!isAppReady) {
        return <CircularProgress color={"secondary"} size={'5rem'} sx={{mt: '8rem'}}/>
    }

    return (
        <>
            {noConnection ?
                <ErrorPage message={'The server isn\'t responding. Try again later.'}/>
                :
                <Routes>
                    <Route path={'/'} element={<MainPage/>}/>
                    <Route path={'/offers'} element={<OffersPage/>}/>
                    <Route path={'/auth'} element={<AuthPage/>}/>
                    <Route path={'/personal-area'} element={<PersonalAreaPage/>}/>
                </Routes>
            }
        </>
    )
}

export default App
