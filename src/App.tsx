import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./pages/Layout.tsx";
import { AreaPersonaleLayout } from "./pages/AreaPersonaleLayout.tsx"; // ✅ nuovo layout fisso
import { Home } from "./pages/Home.tsx";
import { AreaPersonale } from "./pages/AreaPersonale.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import { PageNotFound } from "./pages/PageNotFound.tsx";

import "./assets/css/index.css";
import { useAuthStore } from "./stores/AuthStore.ts";
import { useEffect, useState } from "react";
import { UserProvider } from "./context/UserProvider";
import {Agenda} from "./components/agendaPersonale/Agenda.tsx";

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
                            {/* layout base */}
                            <Route element={<Layout />}>
                                <Route path="/" index element={<Home />} />
                                <Route path="/aboutus" element={<AboutUs />} />
                                <Route path="*" element={<PageNotFound />} />
                            </Route>

                            {/* layout area personale */}
                            <Route element={<AreaPersonaleLayout />}>
                                <Route path="/areapersonale" element={<AreaPersonale />} />
                                <Route path="/agenda/:id" element={<Agenda />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </UserProvider>
            )}
        </>
    );
}

export default App;
