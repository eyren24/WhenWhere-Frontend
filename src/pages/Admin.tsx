import "../assets/css/admin.css";
import {AdminDashboard} from "../components/admin/AdminDashboard.tsx";
import {AdminUsersSection} from "../components/admin/AdminUsersSection.tsx";
import {AdminAgendeSection} from "../components/admin/AdminAgendeSection.tsx";

export const Admin = () => {
    return (
        <div className="Admin__wrapper">
            <AdminDashboard />
            <AdminUsersSection />
            <AdminAgendeSection />
        </div>
    );
};
