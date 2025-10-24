import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import { Navbar } from "../components/layout/Navbar.tsx";

export const AreaPersonaleLayout = () => {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} gutter={8} />
            <Navbar />
            <main className="page-content">
                <Outlet />
            </main>
        </>
    );
};
