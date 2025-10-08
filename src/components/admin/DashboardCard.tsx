import React from "react";
import type { DashboardStat } from "./types/admin";

type DashboardCardProps = {
    stat: DashboardStat;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ stat }) => (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-all duration-300">
        <div>
            <h3 className="text-sm text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
            {stat.trend !== undefined && (
                <p
                    className={`text-sm mt-1 ${
                        stat.trend >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                >
                    {stat.trend >= 0 ? "▲" : "▼"} {Math.abs(stat.trend)}%
                </p>
            )}
        </div>
        {stat.icon && <div className="text-sky-500">{stat.icon}</div>}
    </div>
);

export default DashboardCard;
