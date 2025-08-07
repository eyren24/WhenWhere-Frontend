import {Outlet, useLocation} from "react-router";
import {Navbar} from "../components/home/Navbar.tsx";
import {NavbarPersonale} from "../components/areaPersonale/NavbarPersonale.tsx";
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
            <Navbar/> :
            <NavbarPersonale/>
        }
        <main>
            <Outlet/>
        </main>
    </>
}