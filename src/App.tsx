import './App.css'
import Header from "./components/Header.tsx";
import {Routes, Route} from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import OffersPage from "./components/offers/OffersPage.tsx";
import {useEffect} from "react";
import {useGetMeMutation} from "./app/api/userApi.ts";
import {useDispatch} from "react-redux";
import {useRefreshMutation} from "./app/api/authApi.ts";
import {logOut, setToken, setUser} from "./app/authSlice.ts";

function App() {
    const [triggerGetMe] = useGetMeMutation()
    const [triggerRefresh] = useRefreshMutation()
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                const refresh = await triggerRefresh().unwrap()
                dispatch(setToken(refresh.accessToken))
                const me = await triggerGetMe().unwrap()
                dispatch(setUser(me))
            } catch {
                dispatch(logOut())
            }
        })()
    }, [])

    return (
        <>
            <Header/>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/offers'} element={<OffersPage/>}/>
            </Routes>
        </>
    )
}

export default App
