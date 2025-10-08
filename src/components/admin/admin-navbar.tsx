import React from "react";
import { Bell, User } from "lucide-react";

const AdminNavbar: React.FC = () => (
    <header className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Pannello di Controllo</h2>
        <div className="flex items-center gap-4">
            <button
                type="button"
                aria-label="Notifiche"
                className="p-2 hover:bg-gray-100 rounded-full transition"
            >
                <Bell size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-full px-2 py-1 transition">
                <User size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
        </div>
    </header>
);

export default AdminNavbar;