import {BrowserRouter, Route, Routes} from "react-router";
import {Layout} from "./pages/Layout.tsx";
import {AreaPersonaleLayout} from "./pages/AreaPersonaleLayout.tsx"; // ✅ nuovo layout fisso
import {Home} from "./pages/Home.tsx";
import {AreaPersonale} from "./pages/AreaPersonale.tsx";
import {Social} from "./pages/Social.tsx"
import AboutUs from "./pages/AboutUs.tsx";
import {PageNotFound} from "./pages/PageNotFound.tsx";

import "./assets/css/index.css";
import {useAuthStore} from "./stores/AuthStore.ts";
import {useEffect, useState} from "react";
import {UserProvider} from "./context/UserProvider";
import {Agenda} from "./components/agendaPersonale/Agenda.tsx";
import {AgendaPubblica} from "./components/layout/AgendaPubblica.tsx";
import {ProtectedRoute} from "./components/routes/ProtectedRoute.tsx";
import {Admin} from "./pages/Admin.tsx";

function App() {
    const { isAuthenticated, getTokenInfo } = useAuthStore();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        if (isAuthenticated)
            getTokenInfo().then(() => setIsCheckingAuth(false));
        else
            setIsCheckingAuth(false);
    }, [getTokenInfo, isAuthenticated]);

    return (
        <>
            {isCheckingAuth ? (
                <div className="loader" style={{ minHeight: "100vh" }}>
                    loading..
                </div>
            ) : (
                <UserProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" index element={<Home />} />
                                <Route path="/aboutus" element={<AboutUs />} />
                                <Route path="*" element={<PageNotFound />} />
                            </Route>

                            <Route element={<AreaPersonaleLayout />}>
                                <Route path="/areapersonale" element={<AreaPersonale />} />
                                <Route path={"/social"} element={<Social />}/>
                                <Route path="/agenda/:id" element={<ProtectedRoute><Agenda/></ProtectedRoute>}/>
                                <Route path="/agenda/pubblica/:id" element={<AgendaPubblica/>}/>
                                <Route path="/admin" element={<Admin/>}/>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </UserProvider>
            )}
        </>
    );
}

export default App;
