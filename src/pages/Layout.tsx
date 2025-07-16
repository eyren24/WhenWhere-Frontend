import {Outlet, useLocation} from "react-router";
import {Navbar} from "../components/home/Navbar.tsx";
import {NavbarPersonale} from "../components/areaPersonale/NavbarPersonale.tsx";

export const Layout = () => {
    const location = useLocation();
    return <>
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