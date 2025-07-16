import './App.css'
import Header from "./components/Header.tsx";
import {Routes, Route} from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import OffersPage from "./components/offers/OffersPage.tsx";

function App() {
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
