import {BrowserRouter, Routes, Route} from "react-router";
import {Layout} from "./pages/Layout.tsx";
import {Home} from "./pages/Home.tsx";
import {AreaPersonale} from "./pages/AreaPersonale.tsx";
import "./assets/css/index.css";
import {useAuthStore} from "./stores/AuthStore.ts";
import {useEffect, useState} from "react";
import { UserProvider } from "./context/UserProvider";
import AboutUs from "./pages/AboutUs.tsx";
import {PageNotFound} from "./pages/PageNotFound.tsx";


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
                <UserProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Layout/>}>
                                <Route path='/' index element={<Home/>}/>
                                <Route path='/AreaPersonale' element={<AreaPersonale/>}/>
                                <Route path='/aboutus' element={<AboutUs/>}/>
                                <Route path='*' element={<PageNotFound/>}/>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </UserProvider>
            }
        </>
    )
}

export default App
