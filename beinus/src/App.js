import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ManagePage from "./pages/ManagePage";
import SearchPage from "./pages/SearchPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/register" element={<RegisterPage />}></Route>
                    <Route path="/manage" element={<ManagePage />}></Route>
                    <Route path="/search" element={<SearchPage />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
