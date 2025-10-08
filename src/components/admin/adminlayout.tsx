import React from "react";
import type { ReactNode } from "react";

import Sidebar from "./sidebar.tsx";
import Navbar from "./admin-navbar.tsx";

type AdminLayoutProps = {
    children: ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
    <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 flex flex-col">
            <Navbar />
            <div className="flex-1 p-8">{children}</div>
        </main>
    </div>
);

export default AdminLayout;