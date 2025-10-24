import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import { Navbar } from "../components/layout/Navbar.tsx"; // <-- aggiungi import

export const Layout = () => {
    return (
        <>
            <Toaster
                position="top-center"
                gutter={8}
                toastOptions={{
                    style: {
                        zIndex: 9999,
                    },
                }}
            />

            <Navbar />

            <main>
                <Outlet />
            </main>
        </>
    );
};
