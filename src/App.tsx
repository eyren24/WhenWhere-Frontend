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
import {ProtectedOwnAgenda} from "./components/routes/ProtectedOwnAgenda.tsx";
import {Admin} from "./pages/Admin.tsx";
import {ProfiloPreview} from "./pages/ProfiloPreview.tsx";
import {ProfiloEdit} from "./pages/ProfiloEdit.tsx";
import {VerifyEmail} from "./pages/VerifyEmail.tsx";
import {ProtectedLogged} from "./components/routes/ProtectedLogged.tsx";
import {ProtectedAdmin} from "./components/routes/ProtectedAdmin.tsx";
import {CustomLoader} from "./components/layout/CustomLoader.tsx";

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
                    <CustomLoader />
                </div>
            ) : (
                <UserProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" index element={<Home />} />

                                <Route path="*" element={<PageNotFound />} />
                            </Route>

                            <Route element={<AreaPersonaleLayout />}>
                                <Route path="/aboutus" element={<AboutUs />} />
                                <Route path="/areapersonale" element={<ProtectedLogged><AreaPersonale /></ProtectedLogged>} />
                                <Route path={"/social"} element={<Social />}/>
                                <Route path="/agenda/:id" element={<ProtectedOwnAgenda><Agenda/></ProtectedOwnAgenda>}/>
                                <Route path="/agenda/pubblica/:id" element={<AgendaPubblica/>}/>
                                <Route path="/admin" element={<ProtectedAdmin><Admin/></ProtectedAdmin>}/>
                                <Route path="/profilo/:id" element={<ProfiloPreview/>}/>
                                <Route path="/profilo" element={<ProtectedLogged><ProfiloEdit/></ProtectedLogged>}/>
                                <Route path="/verify" element={<ProtectedLogged><VerifyEmail/></ProtectedLogged>}/>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </UserProvider>
            )}
        </>
    );
}

export default App;
