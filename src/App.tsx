import {BrowserRouter, Routes, Route} from "react-router";
import {Layout} from "./pages/Layout.tsx";
import {Home} from "./pages/Home.tsx";
import {AreaPersonale} from "./pages/AreaPersonale.tsx";
import "./assets/css/index.css";
import {Login} from "./pages/Login.tsx";
import {useAuthStore} from "./stores/AuthStore.ts";
import {useEffect, useState} from "react";

function App() {

    const {isAuthenticated, getTokenInfo} = useAuthStore();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        if (isAuthenticated)
            getTokenInfo().then(() => setIsCheckingAuth(false));
        else
            setIsCheckingAuth(false);
    }, [getTokenInfo, isAuthenticated]);

    return (
        <>
            {isCheckingAuth ? <>
                    <div className="loader" style={{minHeight: "100vh"}}>
                        loading..
                    </div>
                </> :
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Layout/>}>
                            <Route path='/' index element={<Home/>}/>
                            <Route path='/AreaPersonale' index element={<AreaPersonale/>}/>
                            <Route path='/Login' index element={<Login/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>}
        </>
    )
}

export default App
