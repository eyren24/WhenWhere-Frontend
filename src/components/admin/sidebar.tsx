import React from "react";
import type { NavItem } from "./types/admin";
import { Home, Calendar, Users, Settings } from "lucide-react";
import { Link } from "react-router";

const navItems: NavItem[] = [
    { id: "home", label: "Dashboard", path: "/admin", icon: <Home size={18} /> },
    { id: "events", label: "Eventi", path: "/admin/events", icon: <Calendar size={18} /> },
    { id: "users", label: "Utenti", path: "/admin/users", icon: <Users size={18} /> },
    { id: "settings", label: "Impostazioni", path: "/admin/settings", icon: <Settings size={18} /> },
];

const Sidebar: React.FC = () => (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
        <div>
            <h1 className="text-2xl font-bold text-sky-600 mb-10">When-Where</h1>
            <nav>
                <ul className="space-y-4">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <Link
                                to={item.path}
                                className="flex items-center gap-3 text-gray-700 hover:text-sky-600 transition-colors"
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
        <p className="text-xs text-gray-400 mt-10">© 2025 When-Where</p>
    </aside>
);

export default Sidebar;