import React from "react";
import AdminLayout from "../components/admin/adminlayout.tsx";
import Button from "../components/admin/button.tsx";
import DashboardGrid from "../components/admin/DashboardGrid.tsx";

const AdminDashboard: React.FC = () => (
    <AdminLayout>
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <Button label="Crea nuovo evento" />
            </div>
            <DashboardGrid />
        </div>
    </AdminLayout>
);

export default AdminDashboard;