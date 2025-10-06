import {Outlet, useLocation} from "react-router";
import {Navbar} from "../components/home/Navbar.tsx";
import {Toaster} from "react-hot-toast";

export const Layout = () => {
    const location = useLocation();
    return <>
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
        />
        {
            location.pathname == '/' ?
            <Navbar/> : null
        }
        <main>
            <Outlet/>
        </main>
    </>
}