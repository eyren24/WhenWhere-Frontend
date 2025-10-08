import React from "react";
import type { DashboardStat } from "./types/admin";
import DashboardCard from "./DashboardCard";
import { Users, Calendar, Clock, Activity } from "lucide-react";

const stats: DashboardStat[] = [
    { id: "users", title: "Utenti attivi", value: 124, trend: 8, icon: <Users /> },
    { id: "events", title: "Eventi", value: 37, trend: -3, icon: <Calendar /> },
    { id: "sessions", title: "Sessioni oggi", value: 89, trend: 5, icon: <Clock /> },
    { id: "activity", title: "Tasso di attività", value: "92%", trend: 2, icon: <Activity /> },
];

const DashboardGrid: React.FC = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {stats.map((s) => (
            <DashboardCard key={s.id} stat={s} />
        ))}
    </div>
);

export default DashboardGrid;