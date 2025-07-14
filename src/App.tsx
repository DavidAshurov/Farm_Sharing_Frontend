import './App.css'
import Header from "./components/Header.tsx";
import {Routes, Route} from "react-router-dom";
import MainPage from "./components/MainPage.tsx";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
            </Routes>
        </>
    )
}

export default App
