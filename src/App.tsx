import './App.css'
import {Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import OffersPage from "./components/offers/OffersPage.tsx";
import {useEffect} from "react";
import {useGetMeMutation} from "./app/api/userApi.ts";
import {useDispatch, useSelector} from "react-redux";
import {useRefreshMutation} from "./app/api/authApi.ts";
import {logOut, setToken, setUser} from "./app/authSlice.ts";
import AuthPage from "./components/auth/AuthPage.tsx";

function App() {
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
            } catch {
                dispatch(logOut())
            }
        })()
    }, [])

    return (
        <>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/offers'} element={<OffersPage/>}/>
                <Route path={'/auth'} element={<AuthPage/>}/>
            </Routes>
        </>
    )
}

export default App
