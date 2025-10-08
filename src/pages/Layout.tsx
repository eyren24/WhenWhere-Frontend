import {Outlet} from "react-router";
import {Toaster} from "react-hot-toast";

export const Layout = () => {
    return <>
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
        />


        <main>
            <Outlet/>
        </main>
    </>
}